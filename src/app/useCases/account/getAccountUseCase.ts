import { AccountRepository } from "../../../domain/repositories/accountRepository";
import UseCase from "../../../domain/useCases/account/useCase";

type Input = { accountId: string };
type Output = { accountId: string; name: string; balance: number };

export class GetAccountUseCase implements UseCase<Input, Output> {
  constructor(private readonly accountRepository: AccountRepository) {}

  execute(accountId: string): Output {
    return this.accountRepository.getAll();
  }
}
