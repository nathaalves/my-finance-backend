import { prisma } from '../config/prisma';
import { InsertTransaction } from '../types/transactionTypes';

async function insertTransaction(data: InsertTransaction) {
  await prisma.transaction.create({ data });
}

export const transactionRepository = { insertTransaction };
