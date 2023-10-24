import { HttpException } from '@nestjs/common';

export type ResourceExceptionType =
  | 'ImageNotFound'
  | 'VideoNotFound'
  | 'ImageLocked'
  | 'VideoLocked'
  | 'ImageBroken'
  | 'VideoBroken';

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
    public readonly message: string | null = null,
  ) {
    super(message, httpStatusCode);
    this.exceptionType = exceptionType;
  }
}
