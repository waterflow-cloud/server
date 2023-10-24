import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { APIResponse } from 'src/interfaces/utils';
import { APIException } from 'src/exceptions/api.exception';

@Catch(APIException)
export class APIExceptionFilter implements ExceptionFilter {
  catch(exception: APIException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const httpStatusCode = exception.httpStatusCode;
    console.log(exception);
    response.header('Access-Control-Allow-Origin', '*');
    const response_json: APIResponse<null> = {
      code: exception.apiStatusCode,
      timestamp: Date.now(),
      content: null,
    };
    response.status(httpStatusCode).json(response_json);
  }
}
