import { HttpRequest } from "../protocols/http/httpRequest";
import { HttpResponse } from "../protocols/http/httpResponse";

export interface Controller {
  handleRequest: (request: HttpRequest, response: HttpResponse) => Promise<any>;
}
