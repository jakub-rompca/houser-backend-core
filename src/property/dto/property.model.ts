import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '../../base.model';

@ObjectType()
export class PropertyModel extends BaseModel {
  @Field()
  name: string;

  @Field(() => Int)
  ownerId: number;

  @Field(() => Boolean)
  isAcceptRequired: boolean;

  @Field(() => Boolean)
  isPaymentRequired: boolean;

  @Field(() => Int, { nullable: true })
  fee?: number;
}
