import { NestInterceptor, ExecutionContext, CallHandler, HttpException } from '@nestjs/common';
import { Observable, catchError, map, throwError } from 'rxjs';

interface IResponse<T> {
  success: boolean,
  data: T
}

export class ResponseTransformInterceptor<T> implements NestInterceptor<T, IResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<IResponse<T>> {
    return next
      .handle()
      .pipe(
        map(data => ({ success: true, data })),
        catchError(err => throwError(() => new HttpException({ success: false, message: err.message }, err.status)))
      );
  }
}