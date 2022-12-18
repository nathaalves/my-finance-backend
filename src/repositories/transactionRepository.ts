import { prisma } from '../config/prisma';
import { InsertTransaction, TransactionBody } from '../types/transactionTypes';

async function insertTransaction(data: InsertTransaction) {
  await prisma.transaction.create({ data });
}

async function findTransactionById(id: string) {
  return await prisma.transaction.findUnique({ where: { id } });
}

async function deleteTransaction(id: string) {
  await prisma.transaction.delete({ where: { id } });
}

async function updateTransaction(id: string, data: TransactionBody) {
  await prisma.transaction.update({ where: { id }, data });
}

export const transactionRepository = {
  insertTransaction,
  deleteTransaction,
  findTransactionById,
  updateTransaction,
};
