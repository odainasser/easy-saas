import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { TypeORMBaseEntity } from './base.entity';
import { AttachmentType } from '../../utils/enums/attachment-type.enum';
import { User } from './user.entity';

@Entity('attachments')
export class Attachment extends TypeORMBaseEntity {
  @Column()
  relationId: number;

  @Column()
  relation: string;

  @Column({
    type: 'enum',
    enum: AttachmentType,
    nullable: true,
  })
  type: AttachmentType;

  @Column()
  name: string;

  @Column({ type: 'timestamp', nullable: true })
  deletedAt: Date;

  @Column({ nullable: true })
  deletedBy: number;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'createdBy' })
  creator: User;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'updatedBy' })
  updater: User;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'deletedBy' })
  deleter: User;
}
