import {
  Column,
  Entity,
  OneToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  PrimaryColumn,
} from 'typeorm';
import { Station } from './station.entity';
@Entity()
export class Network {
  @PrimaryGeneratedColumn()
  id: number;
  @PrimaryColumn()
  CityBikes_id: number;
  @Column({ default: null })
  name: string;
  @Column({ default: null })
  href: string;
  @Column({ default: null })
  company: string;
  @Column({ default: null })
  city: string;
  @Column({ default: null })
  country: string;
  @OneToMany(() => Station, (station) => station.network)
  station: Station[];
}
