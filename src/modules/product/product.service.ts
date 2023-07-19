import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { IBuyProduct } from './product.interface';
import { DataSource, In } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { CatalogEntity } from '../catalog/catalog.entity';
import { AssetEntity } from '../asset/asset.entity';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    private readonly productService: ProductRepository,
    private readonly dataSource: DataSource,
  ) {}

  async buyProduct(buyProduct: IBuyProduct) {
    const queryRunner = this.dataSource.createQueryRunner()

    await queryRunner.connect()

    await queryRunner.startTransaction();

    try {
      await queryRunner.query('LOCK TABLE users IN ROW EXCLUSIVE MODE;');

      const user = await queryRunner.manager.findOne(UserEntity, {
        where: { address: buyProduct.walletAddress },
        lock: {
          mode: 'pessimistic_write',
        }
      });

      if (!user) throw new BadRequestException('User not found');

      await queryRunner.query('LOCK TABLE catalogs IN ROW EXCLUSIVE MODE;');

      const catalog = await queryRunner.manager.findOne(CatalogEntity, {
        where: { id: buyProduct.catalogId },
        lock: {
          mode: 'pessimistic_write',
        }
      });

      if (!catalog) throw new BadRequestException('Catalog not found');

      const hasEnoughCash = user.cash1 >= catalog.cost1 && user.cash2 >= catalog.cost2 && user.cash3 >= catalog.cost3;

      if (!hasEnoughCash) throw new BadRequestException('Insufficient cash');

      const reqs = [];
      catalog?.req1 && reqs.push(1);
      catalog?.req2 && reqs.push(2);
      catalog?.req3 && reqs.push(3);

      const assets = await queryRunner.manager.find(AssetEntity, {
        where: {
          type: In(reqs),
          address: user.address,
        }
      });

      if (assets.length != reqs.length) throw new BadRequestException('User does not own at least one asset');

      for (const asset of assets) {
        if (asset.level >= catalog[`req${asset.type}`]) throw new BadRequestException('asset level more than catalogs req');
      }

      const resources = {
        cash1: user.cash1 - catalog.cost1,
        cash2: user.cash2 - catalog.cost2,
        cash3: user.cash3 - catalog.cost3,
      }

      await queryRunner.manager.update(UserEntity, {
        address: buyProduct.walletAddress
      }, resources);

      await queryRunner.manager.insert(ProductEntity, {
        address: user.address,
      });

      await queryRunner.commitTransaction();

      return { resources };
    } catch (e) {
      await queryRunner.rollbackTransaction();
      
      throw e;
    }
    finally {
      await queryRunner.release();
    }
  }
}