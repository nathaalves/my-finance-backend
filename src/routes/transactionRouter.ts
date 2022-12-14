import { Router } from 'express';
import { transactionController } from '../controllers/transactionController';
import { verifyToken } from '../middlewares/authMidleware';
import { validateSchema } from '../middlewares/validateSchema';
import { transactionSchema } from '../schemas/transactionSchema';

const transactionRouter = Router();

transactionRouter.post(
  '/create',
  validateSchema(transactionSchema),
  verifyToken,
  transactionController.createTransaction
);

export { transactionRouter };
