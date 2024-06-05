import { CreateAccountUseCase } from "../../useCases/account/createAccountUseCase";
import { MissingParamsError } from "../../errors/common/missingParamsError";
import {
  GenericHttpResponse,
  HttpResponsePresenter,
} from "../../presentation/http/httpResponse";
import { Controller } from "../../../domain/controllers/controller";
import { HttpRequest } from "../../../domain/protocols/http/httpRequest";
import { CreateProductUseCase } from "../../useCases/products/createProductUseCase";

export interface CreateProductResponse {
  id: string;
  title: string;
  price: number;
  currency: string;
  storage: number;
  manufacturer: string;
  in_stock: boolean;
  last_update: Date;
}

export interface CreateProductRequest {
  title: string;
  price: number;
  currency: string;
  storage: number;
  manufacturer: string;
  in_stock: boolean;
}

export default class CreateProductController
  implements Controller<CreateProductRequest, CreateProductResponse>
{
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly presenter: HttpResponsePresenter<CreateProductResponse>,
  ) {}

  async handleRequest(
    request: HttpRequest<CreateProductRequest>,
  ): Promise<GenericHttpResponse> {
    const { body } = request;

    const createProductResult = await this.createProductUseCase.execute({
      title: "iPhone X",
      price: 999.99,
      currency: "USD",
      storage: 64,
      manufacturer: "Apple",
      in_stock: true,
    });

    if (createProductResult.isLeft()) {
      return this.presenter.serverError(new Error("Failed to create account"));
    }

    const { value } = createProductResult;

    return this.presenter.created({
      ...value,
    });
  }
}
