import { HttpException } from '@nestjs/common';
import { API_STATUS_CODE } from 'src/consts/status-code';

export class APIException extends HttpException {
  /**
   * Define the service error and push them in api response.
   * @param apiStatusCode Code that indicate business status.
   * @param httpStatusCode HTTP code that received by client.
   * @param message Optional message show in error stack and log.
   */
  constructor(
    public readonly apiStatusCode: (typeof API_STATUS_CODE)[keyof typeof API_STATUS_CODE],
    public readonly message: string | null = null,
  ) {
    super(message, 200);
    this.apiStatusCode = apiStatusCode;
    this.message = message;
  }
}
