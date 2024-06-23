import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { ActivityType } from '../../utils/enums/activity-type.enum';
import { BaseEntity } from './base.entity';

@Entity('user_activity')
export class UserActivity extends BaseEntity {
  @Column()
  user_id: number;

  @ManyToOne(() => User, (user) => user.activities, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({
    type: 'enum',
    enum: ActivityType,
  })
  activity_type: ActivityType;

  @Column({ type: 'json', nullable: true })
  metadata: Record<string, any>;
}
