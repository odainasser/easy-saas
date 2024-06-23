import { Entity, Column, OneToMany } from 'typeorm';
import { UserActivity } from './activity.entity';
import { BaseEntity } from './base.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column()
  role_id: number;

  @Column({ type: 'varchar' })
  first_name: string;

  @Column({ type: 'varchar' })
  last_name: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @OneToMany(() => UserActivity, (activity) => activity.user)
  activities: UserActivity[];
}
