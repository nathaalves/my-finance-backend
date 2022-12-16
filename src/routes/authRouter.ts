import { Router } from 'express';
import { reauthenticate, signin, signup } from '../controllers/authController';
import {
  verifyIfUserAlreadyRegistered,
  checkIfPasswordsMatch,
  verifyIfUserExists,
  checkIfPasswordIsCorrect,
  verifyToken,
} from '../middlewares/authMidleware';
import { validateSchema } from '../middlewares/validateSchema';
import { signinSchema, signupSchema } from '../schemas/authSchemas';

const SECRCET_KEY = process.env.JWT_REFRESH_TOKEN_SECRET_KEY;

const authRouter = Router();

authRouter.post(
  '/signup',
  validateSchema(signupSchema),
  checkIfPasswordsMatch,
  verifyIfUserAlreadyRegistered,
  signup
);

authRouter.post(
  '/signin',
  validateSchema(signinSchema),
  verifyIfUserExists,
  checkIfPasswordIsCorrect,
  signin
);

authRouter.post('/reauthenticate', verifyToken(SECRCET_KEY), reauthenticate);

export { authRouter };
