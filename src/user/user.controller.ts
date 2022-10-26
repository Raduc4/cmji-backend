import {
  Controller,
  Get,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { GetCurrentUserId, Public } from 'src/common/decorators';
import { AtGuard } from 'src/common/guards';
import { AdminGuard } from 'src/common/guards/admin.guard';
import {
  OneSerializeInterceptor,
  ManySerializeInterceptor,
} from 'src/common/interceptors/serialize.interceptor';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AtGuard)
  @UseInterceptors(OneSerializeInterceptor)
  @Get('profile')
  async get_profile(@GetCurrentUserId() id: number) {
    return await this.userService.get_profile(id);
  }

  @UseGuards(AtGuard, AdminGuard)
  @UseInterceptors(ManySerializeInterceptor)
  @Get('profiles')
  async get_all_profiles(@Req() req: Request) {
    console.log(req);
    return await this.userService.get_profiles();
  }
}
