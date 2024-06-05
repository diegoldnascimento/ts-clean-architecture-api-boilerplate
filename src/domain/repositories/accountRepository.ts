import type Account from '../entity/account';
import { Repository } from './repository';

export interface AccountRepository extends Repository {
  create(account: Omit<Account, 'id'>): Account;
  update(account: Account): Promise<Account>;
  get(id: string): Promise<Account>;
  getAll(): Promise<Account[]>;
}

