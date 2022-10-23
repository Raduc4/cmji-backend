import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Tokens } from './types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/local/signup')
  @HttpCode(HttpStatus.CREATED)
  signup(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.signupLocal(dto);
  }

  @Post('/local/signin')
  @HttpCode(HttpStatus.OK)
  signin(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.signinLocal(dto);
  }

  @Post('/local/logout')
  @HttpCode(HttpStatus.OK)
  logout() {
    // return this.authService.logout();
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refresh() {
    return this.authService.refreshTokens();
  }
}
