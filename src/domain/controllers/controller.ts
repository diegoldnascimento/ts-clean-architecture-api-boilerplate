import { HttpRequest } from "../protocols/http/httpRequest";
import { HttpResponse } from "../protocols/http/httpResponse";

export interface Controller<RequestModel, ResponseModel> {
  handleRequest: (request: HttpRequest<RequestModel>, response: HttpResponse) => Promise<any>;
}
