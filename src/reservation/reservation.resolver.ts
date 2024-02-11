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
import { ReservationModel } from './dto/reservation.model';
import { PropertyModel } from '../property/dto/property.model';
import { ReservationService } from './reservation.service';
import { CreateReservationInput } from './dto/reservation.input.create';
import { UserModel } from '../user/dto/user.model';
import { DataloaderFactoryInterface } from '../dataloader/interface/dataloader.factory.interface';

@Resolver(() => ReservationModel)
export class ReservationResolver {
  constructor(private readonly reservationService: ReservationService) {}

  @Query(() => ReservationModel)
  async getReservation(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<ReservationModel | null> {
    // TODO not found
    return this.reservationService.findById(id);
  }

  @Mutation(() => ReservationModel)
  async reserveProperty(
    @Args('createReservationInput')
    createReservationInput: CreateReservationInput,
  ) {
    // TODO user from context
    const userId = 3;
    return await this.reservationService.reserveProperty(
      createReservationInput,
      userId,
    );
  }

  @ResolveField('property', () => PropertyModel)
  property(
    @Parent() reservation: ReservationModel,
    @Context('loaders')
    loaders: DataloaderFactoryInterface,
  ) {
    const { propertyId } = reservation;
    return loaders.propertiesLoader.load(propertyId);
  }

  @ResolveField('user', () => UserModel)
  user(
    @Parent() reservation: ReservationModel,
    @Context('loaders')
    loaders: DataloaderFactoryInterface,
  ) {
    const { propertyId } = reservation;
    return loaders.usersLoader.load(propertyId);
  }
}
