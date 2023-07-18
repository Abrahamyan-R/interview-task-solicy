import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { IUserEntity } from './user.interface';
import { ProductEntity } from '../product/product.entity';
import { AssetEntity } from '../asset/asset.entity';

@Entity({ name: 'users' })
export class UserEntity implements IUserEntity {
  @PrimaryColumn()
  address: string;

  @Column({ type: 'float' })
  cash1: number;

  @Column({ type: 'float' })
  cash2: number;

  @Column({ type: 'float' })
  cash3: number;

  @OneToMany(() => ProductEntity, product => product.address)
  products: Array<ProductEntity>;

  @OneToMany(() => AssetEntity, asset => asset.address)
  assets: Array<AssetEntity>;
}