import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '../../base.model';

@ObjectType()
export class ReservationModel extends BaseModel {
  @Field(() => Int)
  propertyId: number;

  @Field(() => Int)
  userId: number;

  @Field(() => Date)
  startDate: Date;

  @Field(() => Date)
  endDate: Date;

  @Field(() => Boolean)
  isAccepted: boolean;

  // TODO validation if isPaymentRequired = true then reservationFee cannot be nulled
  @Field(() => Int, { nullable: true })
  reservationFee?: number;
}
