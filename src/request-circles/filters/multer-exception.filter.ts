import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { MulterError } from 'multer';
import { API_STATUS_CODE } from 'src/consts/status-code';
import { IAPIResponse } from 'src/interfaces/utils';

@Catch(MulterError)
export class MulterExceptionFilter implements ExceptionFilter {
  catch(exception: MulterError, host: ArgumentsHost): IAPIResponse<null> {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    console.log('multer exception', exception);
    switch (exception.code) {
      case 'LIMIT_FILE_SIZE':
        return response.status(200).json({
          timestamp: Date.now(),
          code: API_STATUS_CODE.FILE_SIZE_OVERFLOW,
        });
      case 'LIMIT_FILE_COUNT':
        return response.status(200).json({
          timestamp: Date.now(),
          code: API_STATUS_CODE.FILE_COUNT_OVERFLOW,
        });
      default:
        return response.status(200).json({
          timestamp: Date.now(),
          code: API_STATUS_CODE.UNKNOWN_ERROR,
        });
    }
  }
}
