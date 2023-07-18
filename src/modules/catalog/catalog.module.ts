import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogRepository } from './catalog.repository';
import { CatalogService } from './catalog.service';
import { CatalogController } from './catalog.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([CatalogRepository])
  ],
  controllers: [CatalogController],
  providers: [
    CatalogRepository,
    CatalogService,
  ]
})
export class CatalogModule {

}