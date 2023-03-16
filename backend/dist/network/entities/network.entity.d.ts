import { Station } from './station.entity';
export declare class Network {
    id: number;
    CityBikes_id: string;
    name: string;
    href: string;
    company: string;
    city: string;
    country: string;
    stations: Station[];
}
