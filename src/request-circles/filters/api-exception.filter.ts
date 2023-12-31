import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { APIException } from 'src/exceptions/api.exception';
import { IAPIResponse } from 'src/interfaces/utils';

@Catch(APIException)
export class APIExceptionFilter implements ExceptionFilter {
  catch(exception: APIException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    response.header('Access-Control-Allow-Origin', '*');
    const responseJSON: IAPIResponse<string | null> = {
      code: exception.apiStatusCode,
      timestamp: Date.now(),
      content: exception.message ? null : exception.message,
    };
    response.status(200).json(responseJSON);
  }
}
