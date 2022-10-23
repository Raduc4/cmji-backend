import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Tokens } from './types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/local/signup')
  signup(@Body() dto: AuthDto) {
    this.authService.signupLocal(dto);
  }

  @Post('/local/signin')
  signin() {
    this.authService.signinLocal();
  }

  @Post('/local/logout')
  logout() {
    this.authService.logout();
  }

  @Post('refresh')
  refresh() {
    this.authService.refreshTokens();
  }
}
