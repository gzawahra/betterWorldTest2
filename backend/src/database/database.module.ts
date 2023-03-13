import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Network } from 'src/network/entities/network.entity';
import { Station } from 'src/network/entities/station.entity';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        port: configService.get('POSTGRES_PORT'),
        entities: [Network, Station],
        synchronize: true, //false for production, else destroy/recreate data in the db
      }),
    }),
  ],
})
export class DatabaseModule {}
