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
import { BullModule } from '@nestjs/bull';
import { DataloaderFactory } from './dataloader/loaders/dataloader-factory.service';
import { GqlContextLoadersInterface } from './dataloader/interface/gql-context-loaders.interface';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfigService,
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [DataloaderModule],
      inject: [DataloaderFactory],
      useFactory: (dataloaderFactory: DataloaderFactory) => ({
        // TODO playground to false if prod
        playground: true,
        // TODO schema to file on later stage
        autoSchemaFile: true,
        context: (): GqlContextLoadersInterface => ({
          loaders: dataloaderFactory.getLoaders(),
        }),
      }),
    }),
    BullModule.forRoot({
      redis: {
        // TODO from envs
        host: 'localhost',
        port: 6379,
      },
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
