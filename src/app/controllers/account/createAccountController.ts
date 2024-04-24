import { CreateAccountUseCase } from "../../useCases/account/createAccountUseCase";
import { MissingParamsError } from "../../errors/common/missingParamsError";
import {
  GenericHttpResponse,
  HttpResponsePresenter,
} from "../../presentation/http/httpResponse";
import { Controller } from "../../../domain/controllers/controller";
import { HttpRequest } from "../../../domain/protocols/http/httpRequest";
import { HttpResponse } from "../../../domain/protocols/http/httpResponse";

export interface CreateAccountHttpResponseModel {
  ownerName: string;
}

export interface CreateAccountHttpParamsModel {
  ownerName: string;
}

export default class CreateAccountController implements Controller {
  constructor(
    private readonly createAccountUseCase: CreateAccountUseCase,
    private readonly presenter: HttpResponsePresenter<CreateAccountHttpResponseModel>,
  ) {}

  async handleRequest(
    request: HttpRequest,
    _: HttpResponse,
  ): Promise<GenericHttpResponse> {
    const { body } = request;

    if (!body || Object.keys(body).length == 0) {
      return this.presenter.badRequest(new MissingParamsError("body"));
    }

    const { ownerName } = await this.createAccountUseCase.execute({
      ownerName: "test",
    });

    return this.presenter.created({
      ownerName,
    });
  }
}
