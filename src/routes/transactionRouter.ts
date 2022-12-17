import { Router } from 'express';
import { transactionController } from '../controllers/transactionController';
import { verifyToken } from '../middlewares/authMidleware';
import { validateSchema } from '../middlewares/validateSchema';
import { transactionSchema } from '../schemas/transactionSchema';

const SECRET_KEY = process.env.JWT_ACCESS_TOKEN_SECRET_KEY;

const transactionRouter = Router();

transactionRouter.post(
  '/create',
  validateSchema(transactionSchema),
  verifyToken(SECRET_KEY),
  transactionController.createTransaction
);

export { transactionRouter };
