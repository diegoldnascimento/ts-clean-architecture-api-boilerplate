import type Account from '../entity/account';

export interface AccountRepository {
  create(account: Omit<Account, 'id'>): Account;
  update(account: Account): Promise<Account>;
  get(id: string): Promise<Account>;
  getAll(): Promise<Account[]>;
}

