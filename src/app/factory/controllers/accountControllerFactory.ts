import CreateAccountController from "../../controllers/account/createAccountController";
import { AccountUseCaseFactory } from "../useCases/accountUseCaseFactory";

export class AccountControllerFactory implements AccountAbstractFactory {
  static instance: AccountAbstractFactory;

  constructor(private readonly accountUseCaseFactory: AccountUseCaseFactory) {}

  createAccountController(): CreateAccountController {
    return new CreateAccountController(this.accountUseCaseFactory.createGetAccountUseCase());
  }

  static getInstance(accountUseCaseFactory: AccountUseCaseFactory): AccountControllerFactory {
    if (!AccountControllerFactory.instance) {
      AccountControllerFactory.instance = new AccountControllerFactory(accountUseCaseFactory);
    }
    return AccountControllerFactory.instance;
  }
}
