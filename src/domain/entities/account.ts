import { IBank } from "./Bank";

export type IAccount = {
  id: string;
  ownerName: string;
  bank: IBank;
  createdAt: Date;
  updatedAt: Date;
  status: "created" | "cancelled" 
};

export default class Account implements IAccount {
  constructor(
    readonly id: string,
    readonly ownerName: string,
    readonly bank: IBank,
    readonly createdAt: Date,
    readonly updatedAt: Date,
    readonly status: "created" | "cancelled",
  ) {}

  create(ownerName: string, bank: IBank): IAccount {
    const accountId = crypto.randomUUID();
    const createdAt = new Date();
    const updatedAt = createdAt;
    const status = "created"
    return new Account(accountId, ownerName, bank, createdAt, updatedAt, status);
  }
}

