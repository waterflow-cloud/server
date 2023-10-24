import { HttpException } from '@nestjs/common';

export class APIException extends HttpException {
  /**
   * Define the service error and push them in api response.
   * @param apiStatusCode Code that indicate business status.
   * @param httpStatusCode HTTP code that received by client.
   * @param message Optional message show in error stack and log.
   */
  constructor(
    public readonly apiStatusCode: number,
    public readonly httpStatusCode: number,
    public readonly message: string | null = null,
  ) {
    super(message, httpStatusCode);
    this.apiStatusCode = apiStatusCode;
    this.httpStatusCode = httpStatusCode;
  }
}
