import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ProductController } from './product/product.controller';
import { ProductModule } from './product/product.module';
import { UserController } from './user/user.controller';
import { ProductService } from './product/product.service';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [AuthModule, PrismaModule, UserModule, ProductModule],
  controllers: [ProductController],
  providers: [ProductService, ConfigService, AuthService, JwtService],
})
export class AppModule {}
