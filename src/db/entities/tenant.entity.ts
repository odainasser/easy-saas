import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('tenants')
export class Tenant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  first_name: string;

  @Column({ type: 'varchar' })
  last_name: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar' })
  phone_number: string;

  @Column({ type: 'varchar' })
  national_id: string;

  @Column({ type: 'varchar' })
  emergency_contact: string;

  @Column({ type: 'timestamp', nullable: true })
  last_login: Date;

  @Column({ type: 'date' })
  date_of_birth: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, { nullable: true })
  created_by: User;

  @ManyToOne(() => User, { nullable: true })
  updated_by: User;

  @Column({ type: 'varchar' })
  passport_number: string;

  @Column({
    type: 'enum',
    enum: ['active', 'inactive'],
    default: 'active',
  })
  status: 'active' | 'inactive';
}
