import { transactionRepository } from '../repositories/transactionRepository';
import { TransactionBody } from '../types/transactionTypes';

async function insertData(data: TransactionBody, userId: string) {
  await transactionRepository.insertTransaction({
    ...data,
    userId,
  });
}

async function deleteTransaction(id: string) {
  await transactionRepository.deleteTransaction(id);
}

export const transactionService = { insertData, deleteTransaction };
