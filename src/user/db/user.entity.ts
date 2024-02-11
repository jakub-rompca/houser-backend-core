import { Column, Entity, OneToMany } from 'typeorm';
import { BasicEntity } from '../../database/basic.entity';
import { PropertyEntity } from '../../property/db/property.entity';
import { ReservationEntity } from '../../reservation/db/reservation.entity';

@Entity()
export class UserEntity extends BasicEntity {
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
