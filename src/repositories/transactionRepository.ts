import { prisma } from '../config/prisma';
import { InsertTransaction, TransactionBody } from '../types/transactionTypes';

async function insertTransaction(data: InsertTransaction) {
  const transaction = await prisma.transaction.create({ data });
  return transaction;
}

async function findTransactionById(id: string) {
  const transaction = await prisma.transaction.findUnique({ where: { id } });
  return transaction;
}

async function deleteTransaction(id: string) {
  const transaction = await prisma.transaction.delete({ where: { id } });
  return transaction;
}

async function updateTransaction(id: string, data: TransactionBody) {
  const transaction = await prisma.transaction.update({ where: { id }, data });
  return transaction;
}

export const transactionRepository = {
  insertTransaction,
  deleteTransaction,
  findTransactionById,
  updateTransaction,
};
