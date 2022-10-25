import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '@prisma/client';
import { AuthService } from 'src/auth/auth.service';

// Check if username in field for query matches authenticated user's username
// or if the user is admin
@Injectable()
export class UsernameEmailAdminGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private readonly reflector: Reflector,
  ) {}

  // Returns an array of all the properties of an object seperated by a .
  getPropertiesArray(object: any): string[] {
    let result: string[] = [];
    Object.entries(object).forEach(([key, value]) => {
      const field = key;
      if (typeof value === 'object' && value !== null) {
        const objectProperties = this.getPropertiesArray(value).map(
          (prop) => `${field}.${prop}`,
        );
        result = result.concat(objectProperties);
      } else {
        result.push(field);
      }
    });
    return result;
  }

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

      if (shouldActivate === false && this.authService.isAdmin(user.role)) {
        const adminAllowedArgs = this.reflector.get<string[]>(
          'roles',
          context.getHandler(),
        );

        shouldActivate = true;

        if (adminAllowedArgs) {
          const argFields = this.getPropertiesArray(args);
          argFields.forEach((field) => {
            if (!adminAllowedArgs.includes(field)) {
              throw new UnauthorizedException(
                `Admin is not allowed to modify ${field}`,
              );
            }
          });
        }
      }
    }
    if (!shouldActivate) {
      throw new UnauthorizedException('Could not authenticate with token');
    }
    return shouldActivate;
  }
}
