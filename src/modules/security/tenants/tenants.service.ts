import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tenant } from '../../../shared/entities/tenant.entity';
import { CreateTenantDto } from '../../../shared/dtos/tenants/create-tenant.dto';
import { UpdateTenantDto } from '../../../shared/dtos/tenants/update-tenant.dto';
import { User } from '../../../shared/entities/user.entity';
import { Subscription } from '../../../shared/entities/subscription.entity';
import { CreateSubscriptionDto } from '../../../shared/dtos/subscriptions/create-subscription.dto';
import { PlanType } from '../../../common/enums/plan-type.enum';
import { Plan } from '../../../shared/entities/plan.entity';
import { SubscriptionStatus } from '../../../common/enums/subscription-status.enum';

@Injectable()
export class TenantsService {
  constructor(
    @InjectRepository(Tenant)
    private readonly tenantsRepository: Repository<Tenant>,
    @InjectRepository(Subscription)
    private readonly subscriptionsRepository: Repository<Subscription>,
    @InjectRepository(Plan)
    private readonly plansRepository: Repository<Plan>,
  ) {}

  async create(createTenantDto: CreateTenantDto): Promise<Tenant> {
    try {
      const tenant = this.tenantsRepository.create(createTenantDto);
      return await this.tenantsRepository.save(tenant);
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to create tenant',
        error.message,
      );
    }
  }

  async findAll(): Promise<Tenant[]> {
    try {
      return await this.tenantsRepository.find({ relations: ['users'] });
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to retrieve tenants',
        error.message,
      );
    }
  }

  async findOne(id: string): Promise<Tenant> {
    try {
      const tenant = await this.tenantsRepository.findOne({
        where: { id },
        relations: ['users'],
      });
      if (!tenant) {
        throw new NotFoundException(`Tenant with ID ${id} not found`);
      }
      return tenant;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Failed to retrieve tenant',
        error.message,
      );
    }
  }

  async update(id: string, updateTenantDto: UpdateTenantDto): Promise<Tenant> {
    try {
      const result = await this.tenantsRepository.update(id, updateTenantDto);
      if (result.affected === 0) {
        throw new NotFoundException(`Tenant with ID ${id} not found`);
      }
      const updatedTenant = await this.tenantsRepository.findOne({
        where: { id },
      });
      if (!updatedTenant) {
        throw new NotFoundException(`Tenant with ID ${id} not found`);
      }
      return updatedTenant;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Failed to update tenant',
        error.message,
      );
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const result = await this.tenantsRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Tenant with ID ${id} not found`);
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Failed to delete tenant',
        error.message,
      );
    }
  }

  async addUserToTenant(
    tenantId: string,
    userId: string,
    userType: string,
  ): Promise<Tenant> {
    try {
      const tenant = await this.tenantsRepository.findOne({
        where: { id: tenantId },
        relations: ['users'],
      });
      if (!tenant) {
        throw new NotFoundException(`Tenant with ID ${tenantId} not found`);
      }
      let user = tenant.users.find((user) => user.id === userId);
      if (!user) {
        user = new User();
        user.id = userId;
        user.type = userType;
        tenant.users.push(user);
      } else {
        user.type = userType;
      }
      return await this.tenantsRepository.save(tenant);
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to add or update user in tenant',
        error.message,
      );
    }
  }

  async removeUserFromTenant(
    tenantId: string,
    userId: string,
  ): Promise<Tenant> {
    try {
      const tenant = await this.tenantsRepository.findOne({
        where: { id: tenantId },
        relations: ['users'],
      });
      if (!tenant) {
        throw new NotFoundException(`Tenant with ID ${tenantId} not found`);
      }
      tenant.users = tenant.users.filter((user) => user.id !== userId);
      return await this.tenantsRepository.save(tenant);
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to remove user from tenant',
        error.message,
      );
    }
  }

  async createSubscription(
    tenantId: string,
    createSubscriptionDto: CreateSubscriptionDto,
  ): Promise<Subscription> {
    try {
      const tenant = await this.tenantsRepository.findOne({
        where: { id: tenantId },
      });
      if (!tenant) {
        throw new NotFoundException(`Tenant with ID ${tenantId} not found`);
      }

      const plan = await this.plansRepository.findOne({
        where: { id: createSubscriptionDto.planId },
      });
      if (!plan) {
        throw new NotFoundException(
          `Plan with ID ${createSubscriptionDto.planId} not found`,
        );
      }

      const existingSubscription = await this.subscriptionsRepository.findOne({
        where: { tenantId, status: SubscriptionStatus.ACTIVE },
      });
      if (existingSubscription) {
        throw new InternalServerErrorException(
          'Subscription already exists for this tenant',
        );
      }

      const endDate = new Date();
      if (plan.type === PlanType.MONTHLY) {
        endDate.setMonth(new Date().getMonth() + 1);
      } else if (plan.type === PlanType.YEARLY) {
        endDate.setFullYear(new Date().getFullYear() + 1);
      } else {
        throw new InternalServerErrorException('Invalid plan type');
      }

      const subscription = this.subscriptionsRepository.create({
        ...createSubscriptionDto,
        tenantId,
        endDate,
      });

      const savedSubscription =
        await this.subscriptionsRepository.save(subscription);

      return savedSubscription;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to create subscription',
        error.message,
      );
    }
  }

  async updateSubscription(
    tenantId: string,
    planId: string,
  ): Promise<Subscription> {
    try {
      const subscription = await this.subscriptionsRepository.findOne({
        where: { tenantId, status: SubscriptionStatus.ACTIVE },
      });
      if (!subscription) {
        throw new NotFoundException(
          `Active subscription for tenant with ID ${tenantId} not found`,
        );
      }

      const plan = await this.plansRepository.findOne({
        where: { id: planId },
      });
      if (!plan) {
        throw new NotFoundException(`Plan with ID ${planId} not found`);
      }

      subscription.planId = planId;

      const endDate = new Date();
      if (plan.type === PlanType.MONTHLY) {
        endDate.setMonth(new Date().getMonth() + 1);
      } else if (plan.type === PlanType.YEARLY) {
        endDate.setFullYear(new Date().getFullYear() + 1);
      } else {
        throw new InternalServerErrorException('Invalid plan type');
      }

      return this.subscriptionsRepository.save(subscription);
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to update subscription',
        error.message,
      );
    }
  }
}
