import type Account from '../entity/account';

export default abstract class AccountRepository {
  abstract create(account: Omit<Account, 'id'>): Account;
  abstract update(account: Account): void;
  abstract get(id: string): Promise<Account>;
  abstract getAll(): void;
}