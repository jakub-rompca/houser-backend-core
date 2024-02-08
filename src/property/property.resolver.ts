import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PropertyService } from './property.service';
import { PropertyModel } from './dto/property.model';
import { CreatePropertyInput } from './dto/property.input.create';
import { UpdatePropertyInput } from './dto/property.input.update';

@Resolver()
export class PropertyResolver {
  constructor(private readonly propertyService: PropertyService) {}

  @Query(() => PropertyModel)
  async getProperty(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<PropertyModel | null> {
    // TODO not found
    return this.propertyService.findById(id);
  }

  @Query(() => [PropertyModel])
  async allProperties() {
    return this.propertyService.findAll();
  }

  @Mutation(() => PropertyModel)
  async createProperty(
    @Args('createPropertyInput') createPropertyInput: CreatePropertyInput,
  ): Promise<PropertyModel | null> {
    // TODO create failed
    return await this.propertyService.createProperty(createPropertyInput);
  }

  @Mutation(() => PropertyModel)
  async updateProperty(
    @Args('id') id: number,
    @Args('updatePropertyInput') updatePropertyInput: UpdatePropertyInput,
  ): Promise<PropertyModel | null> {
    // TODO not found
    return await this.propertyService.updateProperty(id, updatePropertyInput);
  }

  @Mutation(() => Boolean)
  async removeProperty(@Args('id') id: number) {
    // TODO delete exception
    return await this.propertyService.removeOneById(id);
  }
}
