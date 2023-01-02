import { transactionRepository } from '../repositories/transactionRepository';
import { TransactionBody } from '../types/transactionTypes';

async function insertData(data: TransactionBody, userId: string) {
  const transaction = await transactionRepository.insertTransaction({
    ...data,
    userId,
  });
  return transaction;
}

async function deleteTransaction(id: string) {
  const transaction = await transactionRepository.deleteTransaction(id);
  return transaction;
}

async function updateTransaction(id: string, data: TransactionBody) {
  const transaction = await transactionRepository.updateTransaction(id, data);
  return transaction;
}

export const transactionService = {
  insertData,
  deleteTransaction,
  updateTransaction,
};
