import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantService } from './tenant.service';
import { Tenant } from '../../../db/entities/tenant.entity';
import { BaseServiceModule } from '../../../modules/core/base/base.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tenant]),
    BaseServiceModule.forEntity(Tenant),
  ],
  providers: [TenantService],
  exports: [TenantService],
})
export class TenantModule {}
