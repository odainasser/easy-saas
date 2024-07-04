import { Entity, Column } from 'typeorm';
import { TypeORMBaseEntity } from './base.entity';

@Entity('roles')
export class Role extends TypeORMBaseEntity {
  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({ type: 'json' })
  permissions: Record<string, any>;

  @Column({ type: 'varchar' })
  description: string;
}
