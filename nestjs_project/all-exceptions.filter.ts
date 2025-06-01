import {
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';
import { Request, Response } from 'express';
import { MyLoggerService } from 'src/my-logger/my-logger.service';

// type MyResponseObj = {
//   statusCode: number;
//   timestamp: string;
//   path: string;
//   response: unknown;
// };

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  private readonly logger: MyLoggerService = new MyLoggerService(
    AllExceptionsFilter.name,
  );

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : exception instanceof PrismaClientValidationError
          ? HttpStatus.UNPROCESSABLE_ENTITY
          : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      timestamp: new Date().toISOString(),
      path: request.url,
      response: 'Internal server error',
    };

    if (exception instanceof HttpException) {
      errorResponse.statusCode = status;
      errorResponse.response = exception.message;
    } else if (exception instanceof PrismaClientValidationError) {
      errorResponse.statusCode = status;
      errorResponse.response = exception.message.replaceAll(/\n/g, '');
    }

    response.status(errorResponse.statusCode).json(errorResponse);
    this.logger.error(
      errorResponse.response,
      errorResponse.path,
      AllExceptionsFilter.name,
    );

    super.catch(exception, host);
  }
}
