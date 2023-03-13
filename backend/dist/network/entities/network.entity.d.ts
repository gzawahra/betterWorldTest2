import { Station } from './station.entity';
export declare class Network {
    id: number;
    CityBikes_id: number;
    name: string;
    href: string;
    company: string;
    city: string;
    country: string;
    station: Station[];
}
