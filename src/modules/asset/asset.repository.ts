import { Repository, DataSource } from 'typeorm';
import { AssetEntity } from './asset.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AssetRepository extends Repository<AssetEntity>{
  constructor(private readonly dataSource: DataSource) {
    super(AssetEntity, dataSource.createEntityManager())
  }
}