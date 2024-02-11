import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BasicEntity } from '../../database/basic.entity';
import { UserEntity } from '../../user/db/user.entity';
import { ReservationEntity } from '../../reservation/db/reservation.entity';

@Entity()
export class PropertyEntity extends BasicEntity {
  @Column()
  name: string;

  @ManyToOne(() => UserEntity, (owner) => owner.properties)
  owner: UserEntity;

  @Column()
  ownerId: number;

  @OneToMany(() => ReservationEntity, (reservation) => reservation.property)
  reservations: ReservationEntity[];

  @Column()
  isAcceptRequired: boolean;

  @Column()
  isPaymentRequired: boolean;

  @Column({ nullable: true })
  fee?: number;
}
