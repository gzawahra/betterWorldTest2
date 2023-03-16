import { Station } from '../entities/station.entity';
import { NetworkService } from '../services/network.service';
export declare class StationController {
    private readonly networkService;
    constructor(networkService: NetworkService);
    getNetworkByName(country: string): Promise<Station[]>;
}
