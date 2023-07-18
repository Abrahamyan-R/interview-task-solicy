import { ICatalogEntity } from "./catalog.interface";
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'catalogs' })
export class CatalogEntity implements ICatalogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  url: string;

  @Column({ type: 'integer' })
  cost1: number;

  @Column({ type: 'integer' })
  cost2: number;

  @Column({ type: 'integer' })
  cost3: number;

  @Column({ type: 'integer', nullable: true })
  req1?: number;

  @Column({ type: 'integer', nullable: true })
  req2?: number;

  @Column({ type: 'integer', nullable: true })
  req3?: number;

  @Column({ type: 'integer' })
  category: number;
}