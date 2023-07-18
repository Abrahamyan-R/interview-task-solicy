import { Injectable, NotFoundException } from '@nestjs/common';
import { CatalogRepository } from './catalog.repository';

@Injectable()
export class CatalogService {
  constructor(private readonly catalogRepo: CatalogRepository) {}

  async getCatalogById(catalogId: number) {
    const catalog = await this.catalogRepo.findOne({
      where: { id: catalogId },
    });

    if (!catalog) throw new NotFoundException('Catalog was not found');

    return catalog;
  }
}