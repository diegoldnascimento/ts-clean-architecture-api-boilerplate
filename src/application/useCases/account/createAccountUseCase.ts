import Account from '../../../domain/entity/account';
import AccountRepository from '../../../domain/repository/accountRepository';
import UseCase from '../../../domain/useCases/account/useCase';

type Input = {
  ownerName: string;
};

type Output = {
  id: number;
  ownerName: string;
};

export default class CreateAccountUseCase implements UseCase<Input, Output> {
  constructor(readonly accountRepository: AccountRepository) {}

  async execute(input: Input): Promise<Output> {
    const account = await this.accountRepository.create({
      ownerName: input.ownerName,
    } as any);

    if (account) {
      return account as any;
    }
    return null;
  }
}