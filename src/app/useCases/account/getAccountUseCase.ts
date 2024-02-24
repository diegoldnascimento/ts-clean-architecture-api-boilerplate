import AccountRepository from "../../../domain/repository/accountRepository";
import UseCase from "../../../domain/useCases/account/useCase";

export class GetAccountUseCase implements UseCase {

    constructor(private readonly accountRepository: AccountRepository) {}

    execute(accountId: string) {
        return this.accountRepository.getAll();
    }
	

}
