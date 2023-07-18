import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CatalogEntity } from './catalog.entity';

@Injectable()
export class CatalogRepository extends Repository<CatalogEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(CatalogEntity, dataSource.createEntityManager());
  }
}