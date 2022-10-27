import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ProductService {
  constructor(
    private userService: UserService,
    config: ConfigService,
    private prisma: PrismaService,
  ) {}

  async create_product(
    creator_id: number,
    title: string,
    price: number,
    qty: number,
  ) {
    const user = await this.userService.find_by_id(creator_id);

    const product = await this.prisma.product.create({
      data: {
        title,
        price,
        qty: 10,
        // authorId: creator_id,
        author: {
          connect: {
            id: user.id,
          },
        },
      },
    });
    return product;
  }
}
