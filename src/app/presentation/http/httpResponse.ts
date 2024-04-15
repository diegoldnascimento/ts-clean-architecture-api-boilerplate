export interface GenericHttpResponse {
  body: any;
  statusCode: number;
  error?: string;
}

export class GenericHttpSuccess<T> implements HttpResponsePresenter<T> {
  response(body: T): GenericHttpResponse {
    return {
      body,
      statusCode: 200,
    };
  }
}

export class GenericHttpSuccessCreated<T> implements HttpResponsePresenter<T> {
  response(body: T): GenericHttpResponse {
    return {
      body,
      statusCode: 201,
    };
  }
}

export class GenericHttpBadRequest<T> implements HttpResponsePresenter<T> {
  response(body: T): GenericHttpResponse {
    return {
      body,
      error: "Bad Request",
      statusCode: 400,
    };
  }
}

export class GenericHttpInternalServerErrorRequest<T> implements HttpResponsePresenter<T> {
  response(body: T): GenericHttpResponse {
    return {
      body,
      error: "Internal Server Error",
      statusCode: 500,
    };
  }
}

export interface HttpResponsePresenter<T> {
  response: (body: T) => GenericHttpResponse;
}
