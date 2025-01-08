import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantService } from './tenant.service';
import { BaseServiceModule } from '../../base/base.module';
import { Tenant } from '../../../shared/entities/tenant.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tenant]),
    BaseServiceModule.forEntity(Tenant),
  ],
  providers: [TenantService],
  exports: [TenantService],
})
export class TenantModule {}
