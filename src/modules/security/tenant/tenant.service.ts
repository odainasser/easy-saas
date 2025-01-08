import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../base/base.service';
import { Tenant } from '../../../shared/entities/tenant.entity';

@Injectable()
export class TenantService {
  constructor(
    @Inject(`BaseService_${Tenant.name}`)
    private readonly baseService: BaseService<Tenant>,
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
  ) {}

  async create(createDto: any, userId: number): Promise<Tenant> {
    return this.baseService.create(createDto, userId);
  }

  async findAll(): Promise<Tenant[]> {
    return this.baseService.findAll();
  }

  async findOne(id: number): Promise<Tenant> {
    return this.baseService.findOne(id);
  }

  async findOneByEmail(email: string): Promise<Tenant> {
    return this.tenantRepository.findOne({ where: { email, deletedAt: null } });
  }

  async update(id: number, updateDto: any, userId: number): Promise<Tenant> {
    return this.baseService.update(id, updateDto, userId);
  }

  async remove(id: number, userId: number): Promise<void> {
    return this.baseService.remove(id, userId);
  }
}
