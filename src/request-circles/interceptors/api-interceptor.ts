import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_STATUS_CODE } from 'src/consts/status-code';
import { APIResponse } from 'src/interfaces/utils';

@Injectable()
export class APIInterceptor<T> implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> {
    return next.handle().pipe(
      map(
        (data): APIResponse<T> => ({
          code: API_STATUS_CODE.REQUEST_OK,
          timestamp: Date.now(),
          content: data,
        }),
      ),
    );
  }
}
