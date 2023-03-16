import {
    Controller,
    Get,
    Logger,
    Param,
    ParseIntPipe,
    Res,
    StreamableFile,
  } from '@nestjs/common';
  import { Station } from '../entities/station.entity';
  import { NetworkService } from '../services/network.service';
  @Controller('stations')
  export class StationController {
    constructor(private readonly networkService: NetworkService) {}
    @Get('/:country')
    getNetworkByName(
      @Param('name') country: string,
    ): Promise<Station[]> {
      Logger.log('get stations by Country');
      return this.networkService.getStationsByCountry(country);
    }
  }
  