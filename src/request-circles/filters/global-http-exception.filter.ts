import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { API_STATUS_CODE } from 'src/consts/status-code';
import { APIResponse } from 'src/interfaces/utils';

@Catch(HttpException)
export class GlobalHttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response<APIResponse>>();
    console.log(exception);
    switch (exception.getStatus()) {
      case HttpStatus.NOT_FOUND:
        response.status(HttpStatus.NOT_FOUND).json({
          code: API_STATUS_CODE.ROUTER_NOT_FOUND,
          timestamp: Date.now(),
        });
        break;
      case HttpStatus.PAYLOAD_TOO_LARGE:
        response.status(HttpStatus.PAYLOAD_TOO_LARGE).json({
          code: API_STATUS_CODE.FILE_SIZE_OVERFLOW,
          timestamp: Date.now(),
        });
        break;
      default:
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          code: API_STATUS_CODE.INTERNAL_ERROR,
          timestamp: Date.now(),
        });
        break;
    }
  }
}
