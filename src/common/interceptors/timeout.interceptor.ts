import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpStatus } from '@nestjs/common';
import { Observable, TimeoutError, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { RequestTimeoutException } from 'src/common/exceptions/custom.exception';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const timeoutTime = 60 * 1000;

        return next.handle().pipe(
            timeout(timeoutTime),
            catchError((error) => {
                if (error instanceof TimeoutError) {
                    return throwError(() => new RequestTimeoutException());
                }
                return throwError(() => error);
            }),
        );
    }
}
