import { HttpException } from '@nestjs/common';

export type ResourceExceptionType =
  | 'ImageNotFound'
  | 'VideoNotFound'
  | 'ImageLocked'
  | 'VideoLocked'
  | 'ImageBroken'
  | 'VideoBroken'
  | 'UnknownError';

export class ResourceException extends HttpException {
  /**
   * Define the service error and push them in api response.
   * @param exceptionType Code that indicate business status.
   * @param httpStatusCode The http status code
   * @param message Optional message show in error stack and log.
   */
  constructor(
    public readonly exceptionType: ResourceExceptionType,
    public readonly httpStatusCode: number,
  ) {
    super(exceptionType, httpStatusCode);
    this.exceptionType = exceptionType;
    this.httpStatusCode = httpStatusCode;
  }
}
