import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundException extends HttpException {
    constructor(message?: string) {
        super(message ?? 'Not Found.', HttpStatus.NOT_FOUND);
    }
}

export class BadRequestException extends HttpException {
    constructor(message?: string) {
        super(message ?? 'Bad Request.', HttpStatus.BAD_REQUEST);
    }
}

export class RequestTimeoutException extends HttpException {
    constructor(message?: string) {
        super(message ?? 'Request Timeout.', HttpStatus.REQUEST_TIMEOUT);
    }
}