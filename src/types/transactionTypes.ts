import { Transaction } from '@prisma/client';

export type TransactionBody = Omit<
  Transaction,
  'id' | 'createdAt' | 'updatedAt' | 'userId'
>;

export type InsertTransaction = Omit<
  Transaction,
  'id' | 'createdAt' | 'updatedAt'
>;
