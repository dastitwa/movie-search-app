import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
  
  import { Observable } from 'rxjs';
  import { tap } from 'rxjs/operators';
  
  @Injectable()
  export class ExecutionTimeInterceptor
    implements NestInterceptor
  {
    intercept(
      context: ExecutionContext,
      next: CallHandler,
    ): Observable<any> {
      const start = Date.now();
  
      return next.handle().pipe(
        tap(() => {
          const duration =
            Date.now() - start;
  
          const request =
            context.switchToHttp().getRequest();
  
          console.log(
            `${request.method} ${request.url} - ${duration}ms`,
          );
        }),
      );
    }
  }