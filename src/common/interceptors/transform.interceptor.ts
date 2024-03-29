import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
    data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
        const contextType = context.getType();
        if (contextType === 'http') {
            const ctx = context.switchToHttp();
            const code = ctx.getResponse().statusCode;

            return next.handle().pipe(map((data) => ({ code, data })));
        }

        return next.handle();
    }
}
