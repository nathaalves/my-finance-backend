import { Request, Response } from 'express';
import { transactionService } from '../services/transactionService';
import { TransactionBody } from '../types/transactionTypes';

async function createTransaction(req: Request, res: Response) {
  const body = req.body as TransactionBody;
  const { userId } = res.locals.payload;
  console.log(body.date);
  const transaction = await transactionService.insertData(body, userId);

  res.status(201).send(transaction);
}

async function deleteTransaction(req: Request, res: Response) {
  const { transactionId } = req.params;

  const transaction = await transactionService.deleteTransaction(transactionId);

  res.status(200).send(transaction);
}

async function updateTransaction(req: Request, res: Response) {
  const { transactionId } = req.params;
  const body = req.body as TransactionBody;

  const transaction = await transactionService.updateTransaction(
    transactionId,
    body
  );

  res.status(200).send(transaction);
}

export const transactionController = {
  createTransaction,
  deleteTransaction,
  updateTransaction,
};
