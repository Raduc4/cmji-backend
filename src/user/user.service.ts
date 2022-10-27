import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { User, UserReturned } from './types/user.types';

@Injectable()
export class UserService {
  private configCode;
  constructor(private prisma: PrismaService, config: ConfigService) {
    this.configCode = config.get<number>('ADMIN_CODE');
  }

  async decreaseUser(code: number, email: string) {
    if (Number(code) !== Number(this.configCode)) {
      throw new UnauthorizedException('You are not authorized to do this');
    }

    await this.prisma.user.update({
      where: {
        email,
      },
      data: {
        role: 'USER',
      },
    });
    return true;
  }
  async increaseAdmin(code: number, email: string) {
    if (Number(this.configCode) !== Number(code)) {
      throw new UnauthorizedException('You are not authorized to do this');
    }
    await this.prisma.user.update({
      where: {
        email,
      },
      data: {
        role: 'ADMIN',
      },
    });
    return true;
  }

  async get_profile(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return user;
  }

  async get_profiles(): Promise<Array<UserReturned>> {
    return await this.prisma.user.findMany();
  }

  async send_tokens(
    my_id: number,
    email: string,
    amount: number,
  ): Promise<boolean> {
    const myAmount = await (await this.get_profile(my_id)).iQuci;

    if (myAmount < amount) {
      return false;
    }

    await this.prisma.user.update({
      where: {
        id: my_id,
      },
      data: {
        iQuci: myAmount - amount,
      },
    });

    const whomAmount = await (await this.find_by_email(email)).iQuci;

    await this.prisma.user.update({
      where: {
        email: email,
      },
      data: {
        iQuci: whomAmount + +amount,
      },
    });

    return true;
  }

  async find_by_id(id: number) {
    return await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  async find_by_email(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
  async fing_by_letters(letters: string) {
    const users = await this.prisma.user.findMany({
      where: {
        email: {
          contains: letters,
          startsWith: letters,
        },
      },
    });
    return users;
  }
}
