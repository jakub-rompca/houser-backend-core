import { BasicEntity } from '../database/basic.entity';

type EntityMapType<T> = {
  [id: number]: T;
};

export function convertEntityArrayToEntityMap<T extends BasicEntity>(
  entities: Array<T>,
): EntityMapType<T> {
  return entities.reduce((entityMap, entity: T) => {
    return {
      ...entityMap,
      [entity.id]: entity,
    };
  }, {});
}
