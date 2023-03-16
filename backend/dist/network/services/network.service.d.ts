import { HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Network } from '../entities/network.entity';
import { Station } from '../entities/station.entity';
export declare class NetworkService {
    private readonly networkRepository;
    private readonly stationRepository;
    constructor(networkRepository: Repository<Network>, stationRepository: Repository<Station>);
    delay(ms: number): Promise<unknown>;
    syncNetworks(): Promise<number>;
    getAllNetworks(): Promise<Network[]>;
    createNetwork(): Promise<Network>;
    createNewNetwork(json: JSON): Promise<Network | HttpStatus>;
    updateNetwork(id: number, network: Network): Promise<Network>;
    getNetworkByCityBikeId(id: string): Promise<Network>;
    getNetwork(id: number, reqrelations?: string[]): Promise<Network>;
    getNetworkByName(name: any): Promise<Network>;
    getNetworkByCity(city: any): Promise<Network>;
    getStation(id: number, reqrelations?: string[]): Promise<Station>;
    syncStations(): Promise<void>;
    createStations(network: Network, response: any): Promise<void>;
    updateStation(id: number, station: Station): Promise<Station>;
    getStationsByCountry(country: any): Promise<Station[]>;
}
