import { UserService } from '../../user/user.service';
import DataLoader from 'dataloader';
import { UserEntity } from '../../user/db/user.entity';
import { convertEntityArrayToEntityMap } from '../dataloader.utils';

export function createUsersLoader(
  usersService: UserService,
): DataLoader<number, UserEntity> {
  return new DataLoader<number, UserEntity>(async (userIds) => {
    const users = await usersService.findByIds([...userIds]);
    const map = convertEntityArrayToEntityMap(users);
    return userIds.map((id) => map[id]);
  });
}
