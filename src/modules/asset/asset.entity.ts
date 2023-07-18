import { UserEntity } from "../user/user.entity";
import { IAssetEntity } from "./asset.interface";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity({ name: 'assets' })
export class AssetEntity implements IAssetEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: number;

  @Column()
  level: number;

  @ManyToOne(() => UserEntity, user => user.assets)
  address: string;
}