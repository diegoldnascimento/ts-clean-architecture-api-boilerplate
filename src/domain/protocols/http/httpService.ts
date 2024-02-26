import { HttpRequest } from "./httpRequest";
import { HttpResponse } from "./httpResponse";

export interface HttpService {
  request: (data: HttpRequest) => Promise<HttpResponse>
  send: (data: HttpRequest) => Promise<HttpResponse>
}
