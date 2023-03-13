import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NetworkController } from './controllers/network.controller';
import { NetworkService } from './services/network.service';
import { Network } from './entities/network.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Network])],
  controllers: [NetworkController],
  providers: [NetworkService],
  exports: [NetworkService],
})
export class NetworkModule {}
