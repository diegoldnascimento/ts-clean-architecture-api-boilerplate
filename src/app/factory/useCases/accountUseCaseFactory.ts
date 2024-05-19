import { AccountAbstractFactory } from "../../../domain/factory/useCases/accountAbstractFactory";
import { AccountRepository } from "../../../domain/repository/accountRepository";
import { GetAccountUseCase } from "../../useCases/account/getAccountUseCase";

export class AccountUseCaseFactory implements AccountAbstractFactory {
  static instance: AccountAbstractFactory;

  constructor(private readonly accountRepository: AccountRepository) {}

  createGetAccountUseCase(): GetAccountUseCase {
    return new GetAccountUseCase(this.accountRepository);
  }

  static getInstance(
    accountRepository: AccountRepository
  ): AccountUseCaseFactory {
    if (!AccountUseCaseFactory.instance) {
      AccountUseCaseFactory.instance = new AccountUseCaseFactory(
        accountRepository,
      );
    }
    return AccountUseCaseFactory.instance;
  }
}
