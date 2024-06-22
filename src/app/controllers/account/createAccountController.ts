import { Controller } from "../../../domain/controllers/controller";
import { HttpRequest } from "../../../domain/protocols/http/httpRequest";
import { MissingParamsError } from "../../errors/common/missingParamsError";
import {
    GenericHttpResponse,
    HttpResponsePresenter
} from "../../presentation/http/httpResponse";
import { CreateAccountUseCase } from "../../useCases/account/createAccountUseCase";

export interface CreateAccountResponse {
  ownerName: string;
}

export interface CreateAccountRequest {
  ownerName: string;
}

export default class CreateAccountController
  implements Controller<CreateAccountRequest, CreateAccountResponse>
{
  constructor(
    private readonly createAccountUseCase: CreateAccountUseCase,
    private readonly presenter: HttpResponsePresenter<CreateAccountResponse>,
  ) {}

  async handleRequest(
    request: HttpRequest<CreateAccountRequest>,
  ): Promise<GenericHttpResponse> {
    const { body } = request;

    if (!body || Object.keys(body).length === 0) {
      return this.presenter.badRequest(new MissingParamsError("body"));
    }

    if (!body.ownerName) {
      return this.presenter.badRequest(new MissingParamsError("ownerName"));
    }

    const createAccountResult = await this.createAccountUseCase.execute({
      ownerName: body.ownerName,
    });

    if (createAccountResult.isLeft()) {
      return this.presenter.serverError(new Error("Failed to create account"));
    }

    const { value } = createAccountResult;
    const { ownerName } = value;

    return this.presenter.created({
      ownerName,
    });
  }
}

