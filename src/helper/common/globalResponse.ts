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
}
