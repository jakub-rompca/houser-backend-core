import { Query, Resolver } from '@nestjs/graphql';
import { UserModel } from '../dto/user.model';
import { UserService } from '../user.service';

@Resolver()
export class UserAdminResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserModel])
  async allUsers(): Promise<UserModel[]> {
    // TODO clean up with dataloader
    const users = await this.userService.findAll();
    return users.map((user) => ({ ...user, properties: [], reservations: [] }));
  }
}
