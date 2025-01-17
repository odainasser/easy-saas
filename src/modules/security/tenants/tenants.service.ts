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

@Injectable()
export class TenantsService {
  constructor(
    @InjectRepository(Tenant)
    private readonly tenantsRepository: Repository<Tenant>,
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
      return await this.tenantsRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to retrieve tenants',
        error.message,
      );
    }
  }

  async findOne(id: string): Promise<Tenant> {
    try {
      const tenant = await this.tenantsRepository.findOne({ where: { id } });
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

  async addUserToTenant(tenantId: string, userId: string): Promise<Tenant> {
    try {
      const tenant = await this.tenantsRepository.findOne({
        where: { id: tenantId },
        relations: ['users'],
      });
      if (!tenant) {
        throw new NotFoundException(`Tenant with ID ${tenantId} not found`);
      }
      const user = new User();
      user.id = userId;
      tenant.users.push(user);
      return await this.tenantsRepository.save(tenant);
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to add user to tenant',
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
}
