import { CreateAccountUseCase } from "../../useCases/account/createAccountUseCase";
import { MissingParamsError } from "../../errors/common/missingParamsError";
import {
  GenericHttpResponse,
  HttpResponsePresenter,
} from "../../presentation/http/httpResponse";
import { Controller } from "../../../domain/controllers/controller";
import { HttpRequest } from "../../../domain/protocols/http/httpRequest";

export interface CreateAccountHttpResponseModel {
  ownerName: string;
}

export interface CreateAccountHttpRequestModel {
  ownerName: string;
}

export default class CreateAccountController implements Controller {
  constructor(
    private readonly createAccountUseCase: CreateAccountUseCase,
    private readonly presenter: HttpResponsePresenter<CreateAccountHttpResponseModel>,
  ) {}

  async handleRequest(
    request: HttpRequest<CreateAccountHttpRequestModel>,
  ): Promise<GenericHttpResponse> {
    const { body } = request;

    if (!body || Object.keys(body).length == 0) {
      return this.presenter.badRequest(new MissingParamsError("body"));
    }

    if (!body.ownerName) {
      return this.presenter.badRequest(new MissingParamsError("ownerName"));
    }

    const createAccountUseCase = await this.createAccountUseCase.execute({
      ownerName: "test",
    });

    if (createAccountUseCase.isLeft()) {
      const { value } = createAccountUseCase;
      return this.presenter.serverError(new Error("Error that needs improvements"))
    }

    const { value } = createAccountUseCase;
    const { ownerName } = value;

    return this.presenter.created({
      ownerName,
    });
  }
}
