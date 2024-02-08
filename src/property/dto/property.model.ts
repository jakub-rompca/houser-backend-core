import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UserModel } from '../../user/dto/user.model';
import { BaseModel } from '../../base.model';

@ObjectType()
export class PropertyModel extends BaseModel {
  @Field()
  name: string;

  @Field(() => UserModel)
  owner: UserModel;

  @Field(() => Boolean)
  isAcceptRequired: boolean;

  @Field(() => Boolean)
  isPaymentRequired: boolean;

  @Field(() => Int, { nullable: true })
  fee?: number;
}
