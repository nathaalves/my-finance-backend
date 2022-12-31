import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors';
import { transactionRepository } from '../repositories/transactionRepository';

async function verifyIfTransactionExists(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;

  const transaction = await transactionRepository.findTransactionById(id);

  if (!transaction) {
    throw new CustomError('Transação não encontrada.', 404);
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
  const { userId } = res.locals.payload;

  if (transaction?.userId !== userId) {
    throw new CustomError('Transação não pertence ao usuário.', 401);
  }

  next();
}

export const transactionMiddleware = {
  verifyIfTransactionExists,
  verifyTransactionBelongsUser,
};
