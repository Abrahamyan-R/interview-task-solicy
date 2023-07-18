import { Injectable } from '@nestjs/common';
import { AssetRepository } from './asset.repository';

@Injectable()
export class AssetService {
  constructor(private readonly assetRepo: AssetRepository) {}
}