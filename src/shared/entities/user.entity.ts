import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Activity } from './activity.entity';
import { TypeORMBaseEntity } from './base.entity';
import { Role } from './role.entity';

@Entity('users')
export class User extends TypeORMBaseEntity {
  @Column()
  roleId: number;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'roleId' })
  role: Role;

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
