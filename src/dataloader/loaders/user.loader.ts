import { UserService } from '../../user/user.service';
import DataLoader from 'dataloader';
import { convertEntityArrayToEntityMap } from '../dataloader.utils';
import { BasicEntity } from '../../database/basic.entity';

// TODO generic loader with service guarded by interface
export function createUsersLoader(
  usersService: UserService,
): DataLoader<number, BasicEntity> {
  return new DataLoader<number, BasicEntity>(async (userIds) => {
    const users = await usersService.findByIds([...userIds]);
    const map = convertEntityArrayToEntityMap(users);
    return userIds.map((id) => map[id]);
  });
}
