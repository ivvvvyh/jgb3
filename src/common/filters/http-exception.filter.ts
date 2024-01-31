import { ArgumentsHost, Catch, ContextType, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException>, GqlExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const hostType = host.getType();
        switch (hostType as ContextType | 'graphql') {
            case 'graphql':
                return exception;
            default:
                const ctx = host.switchToHttp();
                const response = ctx.getResponse();
                const status = exception.getStatus() ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
                const message = exception.message;
                const responseObject = {
                    code: status,
                    message,
                };
                response.status(status).json(responseObject);
        }
    }
}
