import { prisma } from '../config/prisma';
import { InsertTransaction } from '../types/transactionTypes';

async function insertTransaction(data: InsertTransaction) {
  await prisma.transaction.create({ data });
}

async function deleteTransaction(id: string) {
  await prisma.transaction.delete({ where: { id } });
}

export const transactionRepository = {
  insertTransaction,
  deleteTransaction,
};
