import { transactionRepository } from '../repositories/transactionRepository';
import { TransactionBody } from '../types/transactionTypes';

async function insertData(data: TransactionBody, userId: string) {
  await transactionRepository.insertTransaction({
    ...data,
    userId,
  });
}

export const transactionService = { insertData };
