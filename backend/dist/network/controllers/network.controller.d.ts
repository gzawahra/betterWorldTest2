import { HttpStatus } from '@nestjs/common';
import { Network } from '../entities/network.entity';
import { NetworkService } from '../services/network.service';
export declare class NetworkController {
    private readonly networkService;
    constructor(networkService: NetworkService);
    getAllUsers(): Promise<Network[]>;
    getNetworkByName(name: string): Promise<Network>;
    getNetworkByCity(city: string): Promise<Network>;
    createNetwork(json: JSON): Promise<Network | HttpStatus>;
}
