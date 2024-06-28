import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { ActivityType } from '../../utils/enums/activity-type.enum';
import { TypeORMBaseEntity } from '../entities/base.entity';

@Entity('user_activity')
export class UserActivity extends TypeORMBaseEntity {
  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.activities, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({
    type: 'enum',
    enum: ActivityType,
  })
  activityType: ActivityType;

  @Column({ type: 'json', nullable: true })
  metadata: Record<string, any>;
}
