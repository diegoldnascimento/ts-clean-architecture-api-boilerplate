import { IBank } from './Bank';

export type IAccount = {
  id: string;
  ownerName: string;
  bank: IBank;
  createdAt: string;
  updatedAt: string;
}

export default class Account {
  constructor(readonly id: string, readonly ownerName: string, readonly bank: IBank) {

  }
}