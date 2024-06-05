import { Repository } from "./repository";

export interface ProductRepository extends Repository {
  create(product: any): any;
  // update(account: Account): Promise<Account>;
  // get(id: string): Promise<Account>;
  // getAll(): Promise<Account[]>;
}
