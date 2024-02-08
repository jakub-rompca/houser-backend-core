import {
  Args,
  Context,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ReservationModel } from './dto/reservation.model';
import { PropertyModel } from '../property/dto/property.model';
import DataLoader from 'dataloader';
import { PropertyEntity } from '../property/db/property.entity';
import { ReservationService } from './reservation.service';

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

  @ResolveField('property', () => PropertyModel)
  property(
    @Parent() reservation: ReservationModel,
    @Context('propertiesLoader')
    propertiesLoader: DataLoader<number, PropertyEntity>,
  ) {
    const { propertyId } = reservation;
    return propertiesLoader.load(propertyId);
  }
}
