import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetRepository } from './asset.repository';
import { AssetService } from './asset.service';
import { AssetController } from './asset.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([AssetRepository])
  ],
  controllers: [AssetController],
  providers: [
    AssetRepository,
    AssetService
  ],
})
export class AssetModule {
  
}