import { Router } from 'express';
import { reauthenticate, signin, signup } from '../controllers/authController';
import {
  verifyIfUserAlreadyRegistered,
  checkIfPasswordsMatch,
  verifyIfUserExists,
  checkIfPasswordIsCorrect,
  verifyRefreshToken,
} from '../middlewares/authMidleware';
import { validateSchema } from '../middlewares/validateSchema';
import { signinSchema, signupSchema } from '../schemas/authSchemas';

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

authRouter.post('/reauthenticate', verifyRefreshToken, reauthenticate);

export { authRouter };
