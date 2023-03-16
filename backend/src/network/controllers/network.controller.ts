import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { HttpStatusCode } from 'axios';
import { Network } from '../entities/network.entity';
import { NetworkService } from '../services/network.service';
@Controller('network')
export class NetworkController {
  constructor(private readonly networkService: NetworkService) {}
  @Get('/')
  getAllUsers(): Promise<Network[]> {
    return this.networkService.getAllNetworks();
  }
  @Get('/name/:name')
  getNetworkByName(
    @Param('name') name: string,
  ): Promise<Network> {
    Logger.log('get by name');
    // return this.networkService.getNetworkByName(name);
    return this.networkService.getNetworkByName(name);
  }
  @Get('/city/:city')
  getNetworkByCity(
    @Param('city') city: string,
  ): Promise<Network> {
    Logger.log('get by city');
    return this.networkService.getNetworkByCity(city);
  }
  @Post('/')
    createNetwork(@Body() json: JSON): Promise<Network | HttpStatus>{
    Logger.log('get by city');
    console.log(json)
    return this.networkService.createNewNetwork(json);
  }
}
