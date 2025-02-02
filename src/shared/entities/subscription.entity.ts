import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Tenant } from './tenant.entity';
import { Plan } from './plan.entity';
import { SubscriptionStatus } from '../../common/enums/subscription-status.enum';

@Entity('subscriptions')
export class Subscription {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  tenantId: string;

  @Column()
  planId: string;

  @Column()
  startDate: Date;

  @Column({ nullable: true })
  endDate: Date;

  @Column({
    type: 'enum',
    enum: SubscriptionStatus,
    default: SubscriptionStatus.ACTIVE,
  })
  status: SubscriptionStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToOne(() => Tenant, (tenant) => tenant.subscription, {
    onDelete: 'CASCADE',
  })
  tenant: Tenant;

  @OneToOne(() => Plan, (plan) => plan.subscription, {
    onDelete: 'CASCADE',
  })
  plan: Plan;
}
