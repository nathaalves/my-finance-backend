import { Request, Response, NextFunction } from 'express';
import { transactionRepository } from '../repositories/transactionRepository';

async function verifyIfTransactionExists(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;

  const transaction = await transactionRepository.findTransactionById(id);
  console.log(transaction);
  if (!transaction) {
    return res.status(404).send('Transação não encontrada.');
  }

  res.locals.transaction = transaction;

  next();
}

export const transactionMiddleware = {
  verifyIfTransactionExists,
};
