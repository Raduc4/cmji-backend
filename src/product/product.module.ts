import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { AtGuard } from 'src/common/guards';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [],
  providers: [
    ConfigService,
    PrismaService,
    ProductService,
    AtGuard,
    AdminGuard,
    AuthService,
    JwtService,
    UserService,
  ],
  controllers: [ProductController],
})
export class ProductModule {}
