import { Router } from 'express';
import { signup } from '../controllers/authController';
import { verifyIfUserAlreadyRegistered } from '../middlewares/authMidleware';
import { validateSchema } from '../middlewares/validateSchema';
import { signupSchema } from '../schemas/authSchemas';

const authRouter = Router();

authRouter.post(
  '/signup',
  validateSchema(signupSchema),
  verifyIfUserAlreadyRegistered,
  signup
);

export { authRouter };
