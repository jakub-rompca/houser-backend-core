import { Query, Resolver } from '@nestjs/graphql';
import { UserModel } from '../dto/user.model';
import { UserService } from '../user.service';

// TODO restrict for admin session only
@Resolver()
export class UserAdminResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserModel])
  async allUsers(): Promise<UserModel[]> {
    // TODO pagination, order params, search params
    return await this.userService.findAll();
  }
}
