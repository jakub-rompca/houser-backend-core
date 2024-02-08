import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../database/base.entity';
import { PropertyEntity } from '../property/property.entity';
import { ReservationEntity } from '../reservation/reservation.entity';

@Entity()
export class UserEntity extends BaseEntity {
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

  @OneToMany(() => PropertyEntity, (property) => property.owner)
  properties: PropertyEntity[];

  @OneToMany(() => ReservationEntity, (reservation) => reservation.user)
  reservations: ReservationEntity[];
}
