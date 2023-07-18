import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AssetService } from './asset.service';

@Controller('asset')
@ApiTags('Assets')
export class AssetController {
  constructor(private readonly assetSeervice: AssetService) {}
}