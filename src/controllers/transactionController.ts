import { Request, Response } from 'express';
import { transactionService } from '../services/transactionService';
import { TransactionBody } from '../types/transactionTypes';

async function createTransaction(req: Request, res: Response) {
  const body = req.body as TransactionBody;
  const { id: userId }: { id: string } = res.locals.payload;

  await transactionService.insertData(body, userId);

  res.status(201).send('Transação criada com sucesso.');
}

export const transactionController = { createTransaction };
