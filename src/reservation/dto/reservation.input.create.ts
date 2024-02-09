import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateReservationInput {
  @Field()
  propertyId: number;

  // TODO validate if not in the past
  @Field()
  startDate: Date;

  // TODO validate if not before startDate
  @Field()
  endDate: Date;
}
