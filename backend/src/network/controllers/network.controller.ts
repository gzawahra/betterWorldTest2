import {
  Controller,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { Network } from '../entities/network.entity';
import { NetworkService } from '../services/network.service';
@Controller('network')
export class NetworkController {
  constructor(private readonly networkService: NetworkService) {}
  @Get('/')
  getAllUsers(): Promise<Network[]> {
    return this.networkService.getAllNetworks();
  }
  @Get('/:name')
  getNetworkByName(
    @Param('name', ParseIntPipe) name: string,
  ): Promise<Network> {
    Logger.log('get by id number');
    // return this.networkService.getNetworkByName(name);
    return null;
  }
  @Get('/:city')
  getNetworkByCity(
    @Param('city', ParseIntPipe) city: number,
  ): Promise<Network> {
    Logger.log('get by city');
    // return this.networkService.getNetworkByCity(city);
    return null;
  }
}
