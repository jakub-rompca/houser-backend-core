import { UserService } from '../../user/user.service';
import DataLoader from 'dataloader';
import { convertEntityArrayToEntityMap } from '../dataloader.utils';
import { BaseEntity } from '../../database/base.entity';

// TODO generic loader with service guarded by interface
export function createUsersLoader(
  usersService: UserService,
): DataLoader<number, BaseEntity> {
  return new DataLoader<number, BaseEntity>(async (userIds) => {
    const users = await usersService.findByIds([...userIds]);
    const map = convertEntityArrayToEntityMap(users);
    return userIds.map((id) => map[id]);
  });
}
