import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../database/base.entity';
import { UserEntity } from '../user/user.entity';
import { ReservationEntity } from '../reservation/reservation.entity';

@Entity()
export class PropertyEntity extends BaseEntity {
  @Column()
  name: string;

  @ManyToOne(() => UserEntity, (owner) => owner.properties)
  owner: UserEntity;

  @OneToMany(() => ReservationEntity, (reservation) => reservation.property)
  reservations: ReservationEntity[];

  @Column()
  isAcceptRequired: boolean;

  @Column()
  isPaymentRequired: boolean;

  @Column({ nullable: true })
  fee?: number;
}
