import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CatalogService } from './catalog.service';

@Controller('catalog')
@ApiTags('Catalogs')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Get(':id')
  async getCatalogById(@Param('id') catalogId: number) {
    return await this.catalogService.getCatalogById(catalogId);
  }
}