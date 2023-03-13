import {
  ConsoleLogger,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Network } from '../entities/network.entity';
import { Station } from '../entities/station.entity';
import axios from 'axios';

@Injectable()
export class NetworkService {
  constructor(
    @InjectRepository(Network)
    private readonly networkRepository: Repository<Network>,
  ) {}

  async getAllNetworks(): Promise<Network[]> {
    console.log('get all networks');
    const networks: Network[] = [];
    const tmp = await axios
      .get('http://api.citybik.es/v2/networks')
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    // const networks = await this.networkRepository
    //   .find()
    //   .then((networks) => {
    //     console.log(networks);
    //     return networks;
    //   })
    //   .catch((err) => {
    //     return networks;
    //   });
    tmp.networks.forEach(function (network) {
      networks.push(
        network.id,
        network.name,
        network.href,
        network.company,
        network.location.city,
        network.location.country,
        null,
      );
    });
    return networks;
  }

  async createNetwork(): Promise<Network> {
    const network = this.networkRepository.create();
    try {
      await this.networkRepository.save(network);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
    return network;
  }

  async updateNetwork(id: number, network: Network): Promise<Network> {
    if (!network) throw new HttpException('Body null', HttpStatus.NOT_FOUND);
    await this.getNetwork(id);
    try {
      network.id = id;
      await this.networkRepository.update(id, network);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
    return network;
  }
  async getNetwork(
    id: number,
    reqrelations = [] as string[],
  ): Promise<Network> {
    let network = null;
    if (id && reqrelations[0]) {
      console.log('with');
      network = await this.networkRepository.findOne({
        where: { id },
        relations: reqrelations,
      });
    } else {
      console.log('without');
      network = await this.networkRepository.findOne({ where: { id } });
    }
    if (!network) {
      throw new HttpException('network not found', HttpStatus.NOT_FOUND);
    }
    return network;
  }

  async getNetworkByName(name): Promise<Network> {
    return null;
  }
  async getNetworkByCity(city): Promise<Network> {
    return null;
  }
  async getStationByCountry(country): Promise<Station[]> {
    return null;
  }
}
