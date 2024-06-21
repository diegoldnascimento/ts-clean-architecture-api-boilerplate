import { HttpResponse } from "ravendb/dist/Primitives/Http";
import { HttpRequest } from "../protocols/http/httpRequest";

export interface Controller<RequestModel, ResponseModel> {
  handleRequest: (request: HttpRequest<RequestModel>, response: HttpResponse) => Promise<any>;
}
