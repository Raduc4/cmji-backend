import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ProductService {
  constructor(
    private userService: UserService,
    private prisma: PrismaService,
  ) {}

  async delete_product(id: number) {
    try {
      await this.prisma.product.delete({
        where: {
          id,
        },
      });

      return true;
    } catch (error) {
      throw new BadRequestException('Item does not exist');
    }
  }

  async get_all_products() {
    return await this.prisma.product.findMany();
  }

  async purchease_product(
    id: number,
    product_id: number,
    qty_to_buy: number,
    price: number,
  ) {
    const currentUser = this.prisma.user.findFirst({
      where: {
        id,
      },
    });

    const currentUserIQuci = (await currentUser).iQuci;
    if ((await currentUser).iQuci < price * qty_to_buy) {
      throw new Error('You do not have enough iQuci.');
    }

    const authorId = await (
      await this.prisma.product.findFirst({
        where: {
          id: product_id,
        },
      })
    ).authorId;

    await this.prisma.user.update({
      where: {
        id: authorId,
      },
      data: {
        iQuci: currentUserIQuci + price * qty_to_buy,
      },
    });

    await this.prisma.order.create({
      data: {
        qty: qty_to_buy,
        bought_by: {
          connect: {
            id,
          },
        },
      },
    });

    return true;
  }

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
        qty,
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
