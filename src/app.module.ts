import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { DataSource } from 'typeorm';
import { DatabaseModule } from './database/database.module';
import { DatabaseConfigService } from './database/database-config.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ReservationModule } from './reservation/reservation.module';
import { PropertyModule } from './property/property.module';
import { DataloaderModule } from './dataloader/dataloader.module';
import { UserService } from './user/user.service';
import { createUsersLoader } from './dataloader/loaders/user.loader';
import { PropertyService } from './property/property.service';
import { createPropertiesLoader } from './dataloader/loaders/property.loader';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfigService,
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      // TODO some way to inject service bag instead of each individual service
      imports: [UserModule, PropertyModule],
      inject: [UserService, PropertyService],
      useFactory: (
        userService: UserService,
        propertyService: PropertyService,
      ) => ({
        // TODO playground to false if prod
        playground: true,
        // TODO schema to file on later stage
        // autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        autoSchemaFile: true,
        context: () => ({
          usersLoader: createUsersLoader(userService),
          propertiesLoader: createPropertiesLoader(propertyService),
        }),
      }),
    }),
    UserModule,
    PropertyModule,
    DatabaseModule,
    ReservationModule,
    DataloaderModule,
  ],
})
export class AppModule {
  constructor(private readonly dataSource: DataSource) {}
}
