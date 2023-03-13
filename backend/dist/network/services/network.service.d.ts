import { Repository } from 'typeorm';
import { Network } from '../entities/network.entity';
import { Station } from '../entities/station.entity';
export declare class NetworkService {
    private readonly networkRepository;
    constructor(networkRepository: Repository<Network>);
    getAllNetworks(): Promise<Network[]>;
    createNetwork(): Promise<Network>;
    updateNetwork(id: number, network: Network): Promise<Network>;
    getNetwork(id: number, reqrelations?: string[]): Promise<Network>;
    getNetworkByName(name: any): Promise<Network>;
    getNetworkByCity(city: any): Promise<Network>;
    getStationByCountry(country: any): Promise<Station[]>;
}
