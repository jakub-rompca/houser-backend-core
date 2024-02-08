import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '../../base.model';
import { UserModel } from '../../user/dto/user.model';
import { PropertyModel } from '../../property/dto/property.model';

@ObjectType()
export class ReservationModel extends BaseModel {
  @Field(() => PropertyModel)
  property: PropertyModel;

  @Field(() => UserModel)
  user: UserModel;

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
