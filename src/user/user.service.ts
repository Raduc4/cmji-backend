import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User, UserReturned } from './types/user.types';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

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
}
