import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  createdBy: number;

  @Column({ nullable: true })
  updatedBy: number;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'createdBy' })
  creator: User;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'updatedBy' })
  updater: User;
}
