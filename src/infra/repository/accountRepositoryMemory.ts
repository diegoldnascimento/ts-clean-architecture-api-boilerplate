import type Account from "../../domain/entity/account";
import AccountRepository from "../../domain/repository/accountRepository";

const AccountRepositoryErrors = {
  NOT_FOUND_ACCOUNT: "Account not found",
  NOT_ALLOWED_TO_CHANGE_ID: "Account ID is not allowed to change",
};

export class InMemoryAccountRepository implements AccountRepository {
  private accounts: Account[] = [];
  static counter = 0;

  constructor() {
    InMemoryAccountRepository.counter++;
  }

  create(account: Account) {
    this.accounts.push(account);
    return account;
  }

  async update(account: Account): Promise<Account> {
    return new Promise(async (resolve, reject) => {
      const accountIdx = this.accounts.findIndex(
        (acc) => acc.id === account.id
      );

      if (accountIdx == -1) {
        return reject(new Error(AccountRepositoryErrors.NOT_FOUND_ACCOUNT));
      }

      if (account.id !== this.accounts[accountIdx].id) {
        return reject(
          new Error(AccountRepositoryErrors.NOT_ALLOWED_TO_CHANGE_ID)
        );
      }

      this.accounts[accountIdx] = account;
      return resolve(account);
    });
  }

  async get(id: string): Promise<Account> {
    return new Promise((resolve, reject) => {
      const account = this.accounts.find((account) => account.id == id);

      if (account) {
        return resolve(account);
      }

      return reject(new Error(AccountRepositoryErrors.NOT_FOUND_ACCOUNT));
    });
  }

  getAll(): Promise<Account[]> {
    return Promise.resolve(this.accounts);
  }

  static getCounter() {
    return InMemoryAccountRepository.counter;
  }
}
