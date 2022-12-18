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

async function verifyTransactionBelongsUser(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  const { transaction } = res.locals;
  const { id: userId } = res.locals.payload;

  if (transaction?.userId !== userId) {
    return res.status(401).send('Transação não pertence ao usuário.');
  }

  next();
}

export const transactionMiddleware = {
  verifyIfTransactionExists,
  verifyTransactionBelongsUser,
};
