import DataLoader from 'dataloader';
import { convertEntityArrayToEntityMap } from '../dataloader.utils';
import { PropertyEntity } from '../../property/db/property.entity';
import { PropertyService } from '../../property/property.service';

// TODO generic loader with service guarded by interface
export function createPropertiesLoader(
  propertyService: PropertyService,
): DataLoader<number, PropertyEntity> {
  return new DataLoader<number, PropertyEntity>(async (propertyIds) => {
    const users = await propertyService.findByIds([...propertyIds]);
    const map = convertEntityArrayToEntityMap(users);
    return propertyIds.map((id) => map[id]);
  });
}
