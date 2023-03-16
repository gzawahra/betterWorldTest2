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
  @Column({nullable: true})
  CityBikes_id: string;
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
  stations: Station[];
}
