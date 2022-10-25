import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

// import { GqlExecutionContext } from '@nestjs/graphql';
// import { User } from '../../users/dto/users-inputs.dto';
// import { UsersService } from '../../users/users.service';
// import { AuthenticationError } from 'apollo-server-core';

// Check if username in field for query matches authenticated user's username
// or if the user is admin
@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(ctx: ExecutionContext): boolean {
    const request = ctx.switchToHttp().getRequest();
    if (request.user) {
      const user = request.user;
      // if (this.usersService.isAdmin(user.permissions)) return true;
    }
    throw new UnauthorizedException(
      'Could not authenticate or user does not have permissions',
    );
  }
}
