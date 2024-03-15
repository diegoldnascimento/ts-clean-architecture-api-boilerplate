import { AccountRepository } from "../../../domain/repository/accountRepository";
import UseCase from "../../../domain/useCases/account/useCase";
import { MissingParamsError } from "../../errors/common/missingParamsError";

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
    const accountCreated = this.accountRepository.create({
      ownerName: input.ownerName,
      bank: {
        id: "1",
        name: "test",
        code: "123",
      },
    });

    if (!accountCreated) {
      throw new MissingParamsError("account");
    }

    return {
      id: accountCreated.id,
      ownerName: accountCreated.ownerName,
    };
  }
}
