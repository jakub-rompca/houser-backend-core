import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RegisterUserInput {
  // TODO validate length
  @Field()
  name: string;

  // TODO validate on email
  @Field()
  email: string;

  // TODO security?
  @Field()
  password: string;
}
