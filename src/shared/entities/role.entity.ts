import { Entity, Column, OneToMany } from 'typeorm';
import { TypeORMBaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity('roles')
export class Role extends TypeORMBaseEntity {
  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({ type: 'json' })
  permissions: Record<string, any>;

  @Column({ type: 'varchar' })
  description: string;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
