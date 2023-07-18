import { IsInt, IsString } from "class-validator";
import { IBuyProduct } from "./product.interface";
import { ApiProperty } from '@nestjs/swagger';

export class BuyProductDto implements IBuyProduct {
  @IsInt()
  @ApiProperty()
  catalogId: number;

  @IsString()
  @ApiProperty()
  walletAddress: string;
}