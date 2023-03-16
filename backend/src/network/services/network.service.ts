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
import axios, { AxiosResponse } from 'axios';
import { stat } from 'fs';

@Injectable()
export class NetworkService {
  constructor(
    @InjectRepository(Network)
    private readonly networkRepository: Repository<Network>,
    @InjectRepository(Station)
    private readonly stationRepository: Repository<Station>,
  ) {}
  async delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
 async syncNetworks() : Promise<number> {
  const networks: Network[] = [];
  let num = -1;
  const tmpNetworks = await axios
    .get('http://api.citybik.es/v2/networks')
    .then((response) => {
      num = response.data.networks.length;
      console.log(num);
      if(response.status != 200) {
        console.log(response.status);
        throw new HttpException("bad status", HttpStatus.TOO_MANY_REQUESTS);
      }
      return response.data.networks;
    })
    .catch((error) => {
      throw new HttpException(error.message, HttpStatus.TOO_MANY_REQUESTS);
      console.log(error);
    });
   tmpNetworks.forEach( async (value) => {
    if(await this.networkRepository.findOne({ where: { CityBikes_id: value.id } }) == null) {
      if(value.id !== null && value.id !== undefined) {
        const tmpNetwork = await this.createNetwork();
        tmpNetwork.CityBikes_id = value.id;
        tmpNetwork.name = value.name;
        tmpNetwork.href = value.href;
        tmpNetwork.company = value.company;
        tmpNetwork.city = value.location.city;
        tmpNetwork.country = value.location.country;
        await this.updateNetwork(tmpNetwork.id, tmpNetwork);  
        this.delay(100);
      }
    }
  });
  return num;
 }
  async getAllNetworks(): Promise<Network[]> {
    this.syncNetworks();
    return await this.networkRepository.find();
  }
  async createNetwork(): Promise<Network> {
    const network = this.networkRepository.create();
    try {
      await this.networkRepository.save(network);
    } catch (error) {
      console.log(network.CityBikes_id);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
    return network;
  }
  async createNewNetwork(json: JSON): Promise<Network | HttpStatus>{
    if(json["name"] == null || json["country"] == null || json["city"] == null)
      return HttpStatus.BAD_REQUEST;
    let network = await this.networkRepository.findOne({ where: {name: json["name"]}}).then(async value => { 
      if (value == null)
        value = await this.createNetwork(); 
      return value;
    });
    network.name = json["name"];
    network.company = json["compagny"];
    network.city = json["city"];
    network.country = json["country"];
    this.updateNetwork(network.id,network);
    return await this.networkRepository.findOne({ where: {id: network.id}});
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
  async getNetworkByCityBikeId(id : string) {
    console.log(id);
    return await this.networkRepository.findOne({ where: { CityBikes_id: id } });
  }
  async getNetwork(
    id: number,
    reqrelations = [] as string[],
  ): Promise<Network> {
    let network = null;
    if (id && reqrelations[0]) {
      network = await this.networkRepository.findOne({
        where: { id },
        relations: reqrelations,
      });
    } else {
      network = await this.networkRepository.findOne({ where: { id } });
    }
    if (!network) {
      throw new HttpException('network not found', HttpStatus.NOT_FOUND);
    }
    return network;
  }

  async getNetworkByName(name): Promise<Network> {
    return await this.networkRepository.findOne({ where: { name } });
  }
  async getNetworkByCity(city): Promise<Network> {
    return await this.networkRepository.findOne({ where: { city } });;
  }
  async getStation(
    id: number,
    reqrelations = [] as string[],
  ): Promise<Station> {
    let station = null;
    if (id && reqrelations[0]) {
      station = await this.stationRepository.findOne({
        where: { id },
        relations: reqrelations,
      });
    } else {
      station = await this.stationRepository.findOne({ where: { id } });
    }
    if (!station) {
      throw new HttpException('station not found', HttpStatus.NOT_FOUND);
    }
    return station;
  }
  async syncStations() {
    const networks = await this.networkRepository.find();
    networks.forEach(async network =>{
      await axios
      .get('http://api.citybik.es/v2/networks/'+ network.CityBikes_id)
      .then(async (response) => {
        if(response.status == 200) {
          this.createStations(network,response);       
        }
      })
      .catch((error) => {
        throw new HttpException(error.message,HttpStatus.BAD_REQUEST);
      });
    });
  }
  async createStations(network: Network,response: any) { 
    if(response != null && response !=undefined)
    response.data.network.stations.forEach(async value => {
      if(value.id != null && value.id != undefined) {
          let station = await this.stationRepository.findOne({ where: { CityBikes_id: value.id } });
          if(station == null) {
            station = this.stationRepository.create();
            await this.stationRepository.save(station);
          }
          try {
            station.network = network;
            station.CityBikes_id = value.id;
            station.name = value.name;
            station.country = network.country;
            station.longitude = value.longitude;
            station.latitude = value.latitude;
            station.empty_slots = value.empty_slots;
            if(station.empty_slots == null || station.empty_slots == undefined) station.empty_slots = 0;
            station.free_bikes = value.free_bikes;
            this.updateStation(station.id, station);
          } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
          }
        }
    });
  }
  async updateStation(id: number, station: Station): Promise<Station> {
    if (!station) throw new HttpException('Body null', HttpStatus.NOT_FOUND);
    await this.getStation(id);
    try {
      station.id = id;
      await this.stationRepository.update(id, station);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
    return station;
  }
  async getStationsByCountry(country): Promise<Station[]> {
    return await this.stationRepository.find({ where : {country} });
  }
}

