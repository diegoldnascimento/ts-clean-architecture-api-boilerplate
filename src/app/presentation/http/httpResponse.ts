export interface GenericHttpResponse {
  body?: any;
  statusCode: number;
  error?: string;
  message?: string | Error;
}

export class GenericHttpResponsePresenter<T>
  implements HttpResponsePresenter<T>
{
  serverError(error: Error): GenericHttpResponse {
    return {
      message: error.toString(),
      error: "Internal Server Error",
      statusCode: 400,
    };
  }

  success(body: T): GenericHttpResponse {
    return {
      body,
      statusCode: 200,
    };
  }

  badRequest(error: Error): GenericHttpResponse {
    return {
      error: "Bad Request",
      message: error.toString(),
      statusCode: 400,
    };
  }

  forbidden(error: Error): GenericHttpResponse {
    return {
      message: error.toString(),
      error: "Unauthorized",
      statusCode: 401,
    };
  }

  created(body: T): GenericHttpResponse {
    return {
      body,
      statusCode: 201,
    };
  }
}

export interface HttpResponsePresenter<T> {
  serverError: (error: Error) => GenericHttpResponse;
  forbidden: (error: Error) => GenericHttpResponse;
  success: (body: T) => GenericHttpResponse;
  badRequest: (error: Error) => GenericHttpResponse;
  created: (body: T) => GenericHttpResponse;
}
