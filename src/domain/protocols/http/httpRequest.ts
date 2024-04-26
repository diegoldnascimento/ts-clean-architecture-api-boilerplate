export interface HttpRequest<T> {
  url: string;
  method: string;
  body?: T;
  headers?: any;
}
