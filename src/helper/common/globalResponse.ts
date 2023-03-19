import { GlobalResponseType } from '../types/common.type';

export class GlobalResponse {
  [x: string]: any;
  public successResponse(
    statusCode: number,
    message: string,
    data?: unknown,
  ): any {
    const response: GlobalResponseType = {
      statusCode,
      message,
      data,
    };

    return response;
  }

  public errorResponse(
    statusCode: number,
    message: string,
    error?: string,
    name?: string,
  ): any {
    const response: GlobalResponseType = {
      statusCode,
      message,
      error,
      name,
    };

    return response;
  }

  public error(error): any {
    return this.errorResponse(
      error.response?.statusCode ?? 500,
      error?.message ?? 'internal server error',
      error.response ? error.response : error.detail,
    );
  }
}
