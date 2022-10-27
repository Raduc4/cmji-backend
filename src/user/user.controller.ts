import {
  Body,
  Controller,
  Get,
  Patch,
  Put,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { GetCurrentUserId, Public } from 'src/common/decorators';
import { AdminAllowedArgs } from 'src/common/decorators/admin_metadata.decorator';
import { AtGuard } from 'src/common/guards';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { EmailAdminGuard } from 'src/common/guards/email-admin.guard';
import {
  OneSerializeInterceptor,
  ManySerializeInterceptor,
} from 'src/common/interceptors/serialize.interceptor';
import { QueryDto } from './dto/query.dto';
import { SendTokensDTO } from './dto/send_tokens.dto';
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

  @AdminAllowedArgs('admin')
  @UseGuards(AtGuard, AdminGuard, EmailAdminGuard)
  @UseInterceptors(ManySerializeInterceptor)
  @Get('profiles')
  async get_all_profiles() {
    return await this.userService.get_profiles();
  }

  @Get()
  @UseGuards(AtGuard)
  @UseInterceptors(ManySerializeInterceptor)
  async find_by_email(@Query() query: QueryDto) {
    return await this.userService.fing_by_letters(query.email);
  }

  @Patch()
  @UseGuards(AtGuard)
  async send_tokens(
    @Body() body: SendTokensDTO,
    @GetCurrentUserId() id: number,
  ) {
    console.log('Amount', body.amount);
    return await this.userService.send_tokens(id, body.email, body.amount);
  }
}
