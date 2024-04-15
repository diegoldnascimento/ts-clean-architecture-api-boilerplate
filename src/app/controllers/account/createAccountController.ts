import { CreateAccountUseCase } from "../../useCases/account/createAccountUseCase";
import { MissingParamsError } from "../../errors/common/missingParamsError";
import {
  GenericHttpResponse,
  HttpResponsePresenter,
} from "../../presentation/http/httpResponse";
import { Controller } from "../../../domain/controllers/controller";
import { HttpRequest } from "../../../domain/protocols/http/httpRequest";
import { HttpResponse } from "../../../domain/protocols/http/httpResponse";

interface CreateAccountHttpResponse {
  ownerName: string;
}

interface CreateAccountHttpRequest {
  ownerName: string;
}

export default class CreateAccountController implements Controller {
  constructor(
    private readonly createAccountUseCase: CreateAccountUseCase,
    private readonly presenter: HttpResponsePresenter<CreateAccountHttpResponse>,
  ) {}

  async handleRequest(
    request: HttpRequest,
    response: HttpResponse,
  ): Promise<GenericHttpResponse> {
    const { body } = request;

    if (!body) {
      throw new MissingParamsError("body");
    }

    const accountCreated = await this.createAccountUseCase.execute({
      ownerName: "test",
    });

    return this.presenter.response({
      ownerName: "test",
    });

    // return res.status(201).json(
    //   httpResponse({
    //     ownerName: "test",
    //   }),
    // );
    // } catch (err) {
    //   if (err instanceof MissingParamsError) {
    //     const fieldName = err.message;
    //     return res.status(400).json({
    //       error: `Missing parameter: ${fieldName}`,
    //     });
    //   } else {
    //     return res.status(500).json({
    //       status: err.message || "Internal Server Error",
    //     });
    //   }
    // }
  }
}
