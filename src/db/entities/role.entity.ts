import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({ type: 'json' })
  permissions: Record<string, any>;

  @Column({ type: 'varchar' })
  description: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true, name: 'deleted_at' })
  deletedAt: Date;

  @ManyToOne(() => Role, { nullable: true })
  @JoinColumn({ name: 'createdBy' })
  createdBy: Role;

  @ManyToOne(() => Role, { nullable: true })
  @JoinColumn({ name: 'updatedBy' })
  updatedBy: Role;

  @ManyToOne(() => Role, { nullable: true })
  @JoinColumn({ name: 'deletedBy' })
  deletedBy: Role;
}
