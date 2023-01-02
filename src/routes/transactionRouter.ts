import { Router } from 'express';
import { transactionController } from '../controllers/transactionController';
import {
  verifyIfSessionExists,
  verifyToken,
} from '../middlewares/authMidleware';
import { transactionMiddleware } from '../middlewares/transactionMiddleware';
import { validateSchema } from '../middlewares/validateSchema';
import { transactionSchema } from '../schemas/transactionSchema';

const transactionRouter = Router();

transactionRouter.post(
  '/create',
  validateSchema.body(transactionSchema.bodySchema),
  verifyToken('access'),
  verifyIfSessionExists,
  transactionController.createTransaction
);

transactionRouter.delete(
  '/delete/:transactionId',
  validateSchema.params(transactionSchema.transactionIdParamsSchema),
  verifyToken('access'),
  verifyIfSessionExists,
  transactionMiddleware.verifyIfTransactionExists,
  transactionMiddleware.verifyTransactionBelongsUser,
  transactionController.deleteTransaction
);

transactionRouter.put(
  '/update/:transactionId',
  validateSchema.params(transactionSchema.transactionIdParamsSchema),
  validateSchema.body(transactionSchema.bodySchema),
  verifyToken('access'),
  verifyIfSessionExists,
  transactionMiddleware.verifyIfTransactionExists,
  transactionMiddleware.verifyTransactionBelongsUser,
  transactionController.updateTransaction
);

export { transactionRouter };
