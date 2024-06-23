import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('tenants')
export class Tenant extends BaseEntity {
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

  @Column({ type: 'date' })
  date_of_birth: Date;

  @Column({ type: 'varchar' })
  passport_number: string;
}
