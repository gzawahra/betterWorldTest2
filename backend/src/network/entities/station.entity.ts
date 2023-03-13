import {
  Column,
  Entity,
  OneToOne,
  OneToMany,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Network } from './network.entity';
@Entity()
export class Station {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ default: null })
  name: string;
  @Column({ default: null })
  lattitude: number;
  @Column({ default: null })
  longitude: number;
  @ManyToOne(() => Network, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn()
  network: Network;
}
