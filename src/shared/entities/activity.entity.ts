import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { TypeORMBaseEntity } from '../entities/base.entity';
import { ActivityType } from '../../common/enums/activity-type.enum';
import { Tenant } from './tenant.entity';

@Entity('user_activity')
export class Activity extends TypeORMBaseEntity {
  @Column({ nullable: true })
  userId: number;

  @ManyToOne(() => User, (user) => user.activities, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ nullable: true })
  tenantId: number;

  @ManyToOne(() => Tenant, (tenant) => tenant.activities, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'tenantId' })
  tenant: Tenant;

  @Column({
    type: 'enum',
    enum: ActivityType,
  })
  activityType: ActivityType;

  @Column({ type: 'json', nullable: true })
  metadata: Record<string, any>;
}
