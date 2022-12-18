import { Request, Response } from 'express';
import { transactionService } from '../services/transactionService';
import { TransactionBody } from '../types/transactionTypes';

async function createTransaction(req: Request, res: Response) {
  const body = req.body as TransactionBody;
  const { id: userId }: { id: string } = res.locals.payload;

  await transactionService.insertData(body, userId);

  res.status(201).send('Transação criada com sucesso.');
}

async function deleteTransaction(req: Request, res: Response) {
  const { id } = req.params;

  await transactionService.deleteTransaction(id);

  res.status(200).send('Transação deletada com sucesso.');
}

export const transactionController = { createTransaction, deleteTransaction };
