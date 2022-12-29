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

const authRouter = Router();

authRouter.post(
  '/signup',
  validateSchema.body(signupSchema),
  checkIfPasswordsMatch,
  verifyIfUserAlreadyRegistered,
  signup
);

authRouter.post(
  '/signin',
  validateSchema.body(signinSchema),
  verifyIfUserExists,
  checkIfPasswordIsCorrect,
  signin
);

authRouter.post('/reauthenticate', verifyToken('refresh'), reauthenticate);

export { authRouter };
