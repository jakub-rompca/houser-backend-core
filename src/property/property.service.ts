import { Injectable } from '@nestjs/common';
import { PropertyEntity } from './db/property.entity';
import { PropertyRepository } from './db/property.repository';

// TODO interface for loaders?
@Injectable()
export class PropertyService {
  constructor(private readonly propertyRepository: PropertyRepository) {}

  public async findAll(): Promise<PropertyEntity[]> {
    return this.propertyRepository.find();
  }

  public async findById(id: number): Promise<PropertyEntity | null> {
    return this.propertyRepository.findOneBy({ id });
  }

  public async findByIds(ids: number[]): Promise<PropertyEntity[]> {
    return this.propertyRepository.getByIds(ids);
  }

  public async findByOwnerId(ownerId: number): Promise<PropertyEntity[]> {
    return this.propertyRepository.findBy({ ownerId });
  }

  public async createProperty(
    propertyData: Partial<PropertyEntity>,
  ): Promise<PropertyEntity | null> {
    const savedProperty = await this.propertyRepository.save(propertyData);
    return this.propertyRepository.findOneBy({ id: savedProperty.id });
  }

  public async updateProperty(
    id: number,
    propertyData: Partial<PropertyEntity>,
  ): Promise<PropertyEntity | null> {
    await this.propertyRepository.update(id, propertyData);
    return this.propertyRepository.findOneBy({ id });
  }

  public async removeOneById(id: number): Promise<true> {
    await this.propertyRepository.delete(id);
    return true;
  }
}
