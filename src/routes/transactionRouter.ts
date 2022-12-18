import { Router } from 'express';
import { transactionController } from '../controllers/transactionController';
import { verifyToken } from '../middlewares/authMidleware';
import { transactionMiddleware } from '../middlewares/transactionMiddleware';
import { validateSchema } from '../middlewares/validateSchema';
import { transactionSchema } from '../schemas/transactionSchema';

const SECRET_KEY = process.env.JWT_ACCESS_TOKEN_SECRET_KEY;

const transactionRouter = Router();

transactionRouter.post(
  '/create',
  validateSchema.body(transactionSchema.bodySchema),
  verifyToken(SECRET_KEY),
  transactionController.createTransaction
);

transactionRouter.delete(
  '/delete/:id',
  validateSchema.params(transactionSchema.paramsSchema),
  verifyToken(SECRET_KEY),
  transactionMiddleware.verifyIfTransactionExists,
  transactionMiddleware.verifyTransactionBelongsUser,
  transactionController.deleteTransaction
);

export { transactionRouter };
