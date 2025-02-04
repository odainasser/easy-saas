import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantsService } from './tenants.service';
import { TenantsController } from './tenants.controller';
import { Tenant } from '../../../shared/entities/tenant.entity';
import { Subscription } from '../../../shared/entities/subscription.entity';
import { Plan } from '../../../shared/entities/plan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tenant, Subscription, Plan])],
  controllers: [TenantsController],
  providers: [TenantsService],
})
export class TenantsModule {}
