import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  statusCode: number;
  message: string;
  data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();
    const response = httpContext.getResponse();

    // Pass through specific status codes set by @HttpCode() decorator
    const statusCode = response.statusCode || HttpStatus.OK; 
    const message = response.statusMessage || 'Success'; // Default message, can be customized

    return next.handle().pipe(
      map((data) => ({
        statusCode: statusCode,
        message: message, 
        data: data,
      })),
    );
  }
}
