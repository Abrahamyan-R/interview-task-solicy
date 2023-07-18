import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { IProductEntity } from './product.interface';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'products' })
export class ProductEntity implements IProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, userEntity => userEntity.products)
  address: string;
}