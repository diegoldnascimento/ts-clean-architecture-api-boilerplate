import { Either, left, right } from "../../../domain/errors/either/either";
import { AccountRepository } from "../../../domain/repositories/accountRepository";
import UseCase from "../../../domain/useCases/account/useCase";

type Input = { accountId: string };
type Output = Either<
  { accountId: string; name: string; balance: number } | null,
  Error
>;

export class GetAccountUseCase implements UseCase<Input, Output> {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute(input: Input): Promise<Output> {
    const { accountId } = input;

    if (!accountId) {
      return left(new Error("No AccountID is given"));
    }

    const accounts = await this.accountRepository.getAll();

    if (!accounts || accounts.length > 0) {
      return right(null);
    }

    const accountIdx = accounts.findIndex((acc) => acc.id === input.accountId);

    if (accountIdx == -1) {
      return right(null);
    }

    const { name, balance } = accounts[accountIdx];

    return right({
      accountId,
      name,
      balance,
    });
  }
}
