import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from '../user.service';
import { RegisterUserInput } from '../dto/user.input.register';
import { UserModel } from '../dto/user.model';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserModel)
  async register(
    @Args('registerUserInput') registerUserInput: RegisterUserInput,
  ): Promise<UserModel | null> {
    return await this.userService.registerUser(registerUserInput);
  }
}
