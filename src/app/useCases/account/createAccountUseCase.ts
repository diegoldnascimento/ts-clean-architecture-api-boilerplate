import { AccountRepository } from "../../../domain/repository/accountRepository";
import UseCase from "../../../domain/useCases/account/useCase";

type Input = {
  ownerName: string;
};

type Output = {
  id: string;
  ownerName: string;
};

export class CreateAccountUseCase implements UseCase<Input, Output> {
  constructor(readonly accountRepository: AccountRepository) {}

  async execute(input: Input): Promise<Output> {
    const account = await this.accountRepository.create({
      ownerName: input.ownerName,
      bank: {
        id: "1",
        name: "Nubank",
      },
    });

    if (!account) return null;

    return {
      id: account.id,
      ownerName: account.ownerName,
    };
  }
}
