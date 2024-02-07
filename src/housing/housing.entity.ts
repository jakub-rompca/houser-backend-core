import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../database/base.entity';

@Entity()
export class Housing extends BaseEntity {
  @Column()
  name: string;
}
