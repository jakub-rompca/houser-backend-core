import { BaseEntity } from '../database/base.entity';

type EntityMapType<T> = {
  [id: number]: T;
};

export function convertEntityArrayToEntityMap<T extends BaseEntity>(
  entities: Array<T>,
): EntityMapType<T> {
  return entities.reduce((entityMap, user: T) => {
    return {
      ...entityMap,
      [user.id]: user,
    };
  }, {});
}
