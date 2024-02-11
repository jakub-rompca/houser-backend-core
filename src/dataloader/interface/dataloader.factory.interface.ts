import DataLoader from 'dataloader';
import { UserEntity } from '../../user/db/user.entity';
import { PropertyEntity } from '../../property/db/property.entity';

export interface DataloaderFactoryInterface {
  usersLoader: DataLoader<number, UserEntity>;
  propertiesLoader: DataLoader<number, PropertyEntity>;
}
