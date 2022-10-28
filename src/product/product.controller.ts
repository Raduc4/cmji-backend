import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { GetCurrentUserId } from 'src/common/decorators';
import { AdminAllowedArgs } from 'src/common/decorators/admin_metadata.decorator';
import { AtGuard } from 'src/common/guards';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { CreateProductDTO } from './dto/create_product.dto';
import { DeleteProductDTO } from './dto/delete.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  @AdminAllowedArgs('admin')
  @UseGuards(AtGuard, AdminGuard)
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

  @Delete()
  @AdminAllowedArgs('admin')
  @UseGuards(AtGuard, AdminGuard)
  async delete_product(@Body() body: DeleteProductDTO) {
    return await this.productService.delete_product(Number(body.id));
  }

  @Get()
  @UseGuards(AtGuard)
  async get_all_products() {
    return await this.productService.get_all_products();
  }

  @Post()
  @UseGuards(AtGuard)
  async checkout(
    @GetCurrentUserId() id: number,
    @Body() body: { product_id: number; qty_to_buy: number; price: number },
  ) {
    return await this.productService.purchease_product(
      id,
      body.product_id,
      body.qty_to_buy,
      body.price,
    );
  }
}
