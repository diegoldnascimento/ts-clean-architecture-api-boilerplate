import CreateAccountController from "../../controllers/account/createAccountController";
import {
  GenericHttpResponse,
  HttpResponsePresenter,
} from "../../presentation/http/httpResponse";
import { AccountUseCaseFactory } from "../useCases/accountUseCaseFactory";

export class AccountControllerFactory implements AccountAbstractFactory {
  static instance: AccountAbstractFactory;

  constructor(
    private readonly accountUseCaseFactory: AccountUseCaseFactory,
    private readonly presenter: GenericHttpResponse,
  ) {}

  createAccountController(): CreateAccountController {
    return new CreateAccountController(
      this.accountUseCaseFactory.createGetAccountUseCase(),
      this.presenter,
    );
  }

  static getInstance(
    accountUseCaseFactory: AccountUseCaseFactory,
    presenter: GenericHttpResponse
  ): AccountControllerFactory {
    if (!AccountControllerFactory.instance) {
      AccountControllerFactory.instance = new AccountControllerFactory(
        accountUseCaseFactory,
        presenter
      );
    }
    return AccountControllerFactory.instance;
  }
}
