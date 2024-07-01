import { Entity, Column, OneToMany } from 'typeorm';
import { Activity } from './activity.entity';
import { TypeORMBaseEntity } from './base.entity';

@Entity('users')
export class User extends TypeORMBaseEntity {
  @Column()
  roleId: number;

  @Column({ type: 'varchar' })
  firstName: string;

  @Column({ type: 'varchar' })
  lastName: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @OneToMany(() => Activity, (activity) => activity.user)
  activities: Activity[];
}
