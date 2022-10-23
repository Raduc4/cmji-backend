import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
@Module({
  imports: [ConfigModule, AuthModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
