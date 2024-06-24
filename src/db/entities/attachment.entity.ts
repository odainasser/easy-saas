import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { AttachmentType } from 'src/utils/enums/attachment-type.enum';
import { TypeORMBaseEntity } from './base.entity';

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
  fileName: string;

  @Column({ type: 'timestamp', nullable: true })
  deletedAt: Date;

  @Column({ nullable: true })
  deletedBy: number;
}
