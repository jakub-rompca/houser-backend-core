import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../database/base.entity';
import { PropertyEntity } from '../property/property.entity';
import { UserEntity } from '../user/user.entity';

@Entity()
export class ReservationEntity extends BaseEntity {
  @ManyToOne(() => PropertyEntity, (property) => property.reservations)
  property: PropertyEntity;

  @ManyToOne(() => UserEntity, (user) => user.reservations)
  user: UserEntity;

  // TODO guests as m2m users added by user making reservation?

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column({ default: false })
  isAccepted: boolean;
}
