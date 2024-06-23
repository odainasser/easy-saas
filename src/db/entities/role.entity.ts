import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('roles')
export class Role extends BaseEntity {
  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({ type: 'json' })
  permissions: Record<string, any>;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'timestamp', nullable: true })
  deletedAt: Date;

  @ManyToOne(() => Role, { nullable: true })
  @JoinColumn({ name: 'deletedBy' })
  deletedBy: Role;
}
