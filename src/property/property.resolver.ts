import {
  Args,
  Context,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PropertyService } from './property.service';
import { PropertyModel } from './dto/property.model';
import { CreatePropertyInput } from './dto/property.input.create';
import { UpdatePropertyInput } from './dto/property.input.update';
import { UserModel } from '../user/dto/user.model';
import { DataloaderFactoryInterface } from '../dataloader/interface/dataloader.factory.interface';

@Resolver(() => PropertyModel)
export class PropertyResolver {
  constructor(private readonly propertyService: PropertyService) {}

  @Query(() => PropertyModel)
  async getProperty(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<PropertyModel | null> {
    // TODO not found
    return this.propertyService.findById(id);
  }

  // TODO pagination, order params
  @Query(() => [PropertyModel])
  async allPropertiesForOwner(
    @Args('ownerId', { type: () => Int }) ownerId: number,
  ) {
    return this.propertyService.findByOwnerId(ownerId);
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

  @ResolveField('owner', () => UserModel)
  owner(
    @Parent() property: PropertyModel,
    @Context('loaders')
    loaders: DataloaderFactoryInterface,
  ) {
    const { ownerId } = property;
    return loaders.usersLoader.load(ownerId);
  }
}
