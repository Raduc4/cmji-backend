import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
// import { PrismaService } from 'src/prisma/prisma.service';

// Check if username in field for query matches authenticated user's username
// or if the user is admin
@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthService,
  ) // private prisma: PrismaService,
  {}

  canActivate(ctx: ExecutionContext): boolean {
    const request = ctx.switchToHttp().getRequest();
    if (request.user) {
      const user = request.user;
      if (this.authService.isAdmin(user.role)) return true;
    }
    throw new UnauthorizedException(
      'Could not authenticate or user does not have permissions',
    );
  }
}
