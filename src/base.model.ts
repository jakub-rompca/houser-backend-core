import { Field, Int, ObjectType } from '@nestjs/graphql';

// Mostly for showcase of model inheritance
// Wouldn't use in production grade system in this case of just id
@ObjectType()
export abstract class BaseModel {
  @Field(() => Int)
  id: number;
}
