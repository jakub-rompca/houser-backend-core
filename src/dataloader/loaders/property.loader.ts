import DataLoader from 'dataloader';
import { convertEntityArrayToEntityMap } from '../dataloader.utils';
import { PropertyService } from '../../property/property.service';
import { BaseEntity } from '../../database/base.entity';

// TODO generic loader with service guarded by interface
export function createPropertiesLoader(
  propertyService: PropertyService,
): DataLoader<number, BaseEntity> {
  return new DataLoader<number, BaseEntity>(async (propertyIds) => {
    const properties = await propertyService.findByIds([...propertyIds]);
    const map = convertEntityArrayToEntityMap(properties);
    return propertyIds.map((id) => map[id]);
  });
}
