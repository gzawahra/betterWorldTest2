import {
  Column,
  Entity,
  OneToOne,
  OneToMany,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  PrimaryColumn,
} from 'typeorm';
import { Network } from './network.entity';
@Entity()
export class Station {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({default : null})
  CityBikes_id: string;
  @Column({ default: null })
  name: string;
  @Column({ default: null })
  country: string;
  @Column({ default: null,  type: 'float'  })
  latitude: number;
  @Column({ default: null,  type: 'float'  })
  longitude: number;
  @Column({default: null})
  empty_slots: number;
  @Column({default: null})
  free_bikes: number;
  @ManyToOne(() => Network, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn()
  network: Network;
}
