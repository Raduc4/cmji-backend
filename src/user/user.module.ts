import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  // imports: [AuthModule],
  providers: [UserService, AuthService, JwtService, ConfigService],
  controllers: [UserController],
})
export class UserModule {}
