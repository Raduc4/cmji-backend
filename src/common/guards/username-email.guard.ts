import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthService } from 'src/auth/auth.service';

// Check if username in field for query matches authenticated user's username
// or if the user is admin
@Injectable()
export class UsernameEmailGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    let shouldActivate = false;
    if (request.user) {
      const user = <User>request.user;
      const args = <{ email: string; username: String }>(
        (<unknown>context.getArgs())
      );

      if (args.email && typeof args.email === 'string') {
        shouldActivate = args.email.toLowerCase() === user.email.toLowerCase();
      } else if (!args.username && !args.email) {
        shouldActivate = true;
      }
    }
    if (!shouldActivate) {
      throw new UnauthorizedException('Could not authenticate with token');
    }
    return shouldActivate;
  }
}
