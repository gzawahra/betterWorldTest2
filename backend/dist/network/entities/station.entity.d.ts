import { Network } from './network.entity';
export declare class Station {
    id: number;
    CityBikes_id: string;
    name: string;
    country: string;
    latitude: number;
    longitude: number;
    empty_slots: number;
    free_bikes: number;
    network: Network;
}
