import { Entity, Column } from 'typeorm';
import { TypeORMBaseEntity } from './base.entity';

@Entity('tenants')
export class Tenant extends TypeORMBaseEntity {
  @Column({ type: 'varchar' })
  firstName: string;

  @Column({ type: 'varchar' })
  lastName: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar' })
  phoneNumber: string;

  @Column({ type: 'varchar' })
  nationalId: string;

  @Column({ type: 'varchar' })
  emergencyContact: string;

  @Column({ type: 'date' })
  dateOfBirth: Date;

  @Column({ type: 'varchar' })
  passportNumber: string;
}
