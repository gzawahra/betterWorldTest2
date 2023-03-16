import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NetworkController } from './controllers/network.controller';
import { NetworkService } from './services/network.service';
import { Network } from './entities/network.entity';
import { Station } from './entities/station.entity';
import { StationController } from './controllers/station.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Network,Station])],
  controllers: [NetworkController,StationController],
  providers: [NetworkService],
  exports: [NetworkService],
})
export class NetworkModule {}
