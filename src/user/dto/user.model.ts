import { Field, ObjectType } from '@nestjs/graphql';
import { PropertyModel } from '../../property/dto/property.model';
import { BaseModel } from '../../base.model';
import { ReservationModel } from '../../reservation/dto/reservation.model';

@ObjectType()
export class UserModel extends BaseModel {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field(() => Boolean)
  isActive: boolean;

  @Field(() => [PropertyModel])
  properties: PropertyModel[];

  @Field(() => [ReservationModel])
  reservations: ReservationModel[];
}
