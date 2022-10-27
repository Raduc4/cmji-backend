import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';

import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User, UserReturned } from 'src/user/types/user.types';

export class OneSerializeInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    handler: CallHandler,
  ): Observable<UserReturned> {
    return handler.handle().pipe(
      map((data: User) => {
        const { id, name, role, email, iQuci } = data;

        return {
          id,
          name,
          role,
          email,
          iQuci,
        };
      }),
    );
  }
}

export class ManySerializeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    return handler.handle().pipe(
      map((data: Array<User>) => {
        let arr = [];
        for (let i = 0; i < data.length; i++) {
          const element = data[i];
          const { id, name, role, email, iQuci } = element;

          if (role == 'USER') {
            const el = { id, name, role, email, iQuci };
            arr.push(el);
          }
        }

        return arr;
      }),
    );
  }
}
