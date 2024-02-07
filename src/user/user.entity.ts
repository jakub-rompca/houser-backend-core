import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../database/base.entity';

@Entity()
export class User extends BaseEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  // TODO security
  password: string;

  // TODO roles

  @Column({ default: true })
  isActive: boolean;
}
