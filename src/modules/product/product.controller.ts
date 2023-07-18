import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { BuyProductDto } from './product.dto';

@Controller('product')
@ApiTags('Products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('buy')
  async buyProduct(@Body() buyProduct: BuyProductDto) {
    return await this.productService.buyProduct(buyProduct);
  }
}