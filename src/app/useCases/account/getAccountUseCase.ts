import { AccountRepository } from "../../../domain/repositories/accountRepository";
import UseCase from "../../../domain/useCases/account/useCase";

type Input = { accountId: string };
type Output = { accountId: string; name: string; balance: number } | null;

export class GetAccountUseCase implements UseCase<Input, Output> {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute(input: Input): Promise<Output> {
    const accounts = await this.accountRepository.getAll();

    if (!accounts || accounts.length > 0) {
      return null;
    }

    const accountIdx = accounts.findIndex((acc) => acc.id === input.accountId);

    if (accountIdx == -1) {
      return null;
    }

    const { name, balance } = accounts[accountIdx];
    const { accountId } = input;

    return {
      accountId,
      name,
      balance,
    };
  }
}
