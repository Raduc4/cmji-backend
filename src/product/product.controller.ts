import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { GetCurrentUserId } from 'src/common/decorators';
import { AtGuard } from 'src/common/guards';
import { CreateProductDTO } from './dto/create_product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  @UseGuards(AtGuard)
  async create_product(
    @GetCurrentUserId() id: number,
    @Body() body: CreateProductDTO,
  ) {
    return await this.productService.create_product(
      id,
      body.title,
      Number(body.price),
      Number(body.qty),
    );
  }
}
