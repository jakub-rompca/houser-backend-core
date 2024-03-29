import { Column, Entity, ManyToOne } from 'typeorm';
import { BasicEntity } from '../../database/basic.entity';
import { PropertyEntity } from '../../property/db/property.entity';
import { UserEntity } from '../../user/db/user.entity';

@Entity()
export class ReservationEntity extends BasicEntity {
  @ManyToOne(() => PropertyEntity, (property) => property.reservations)
  property: PropertyEntity;

  @Column()
  propertyId: number;

  @ManyToOne(() => UserEntity, (user) => user.reservations)
  user: UserEntity;

  @Column()
  userId: number;

  // TODO guests as m2m users added by user making reservation?

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column({ default: false })
  isAccepted: boolean;
}
