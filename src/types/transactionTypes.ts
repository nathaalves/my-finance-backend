import { Transaction } from '@prisma/client';

export interface TransactionBody
  extends Omit<Transaction, 'id' | 'createdAt' | 'updatedAt' | 'userId'> {}

export interface InsertTransaction
  extends Omit<Transaction, 'id' | 'createdAt' | 'updatedAt' | 'date'> {
  date: Date;
}
