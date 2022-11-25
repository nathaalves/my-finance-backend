import { Router } from 'express';
import { signup } from '../controllers/authController';
import { verifyIfUserAlreadyRegistered } from '../middlewares/authMidleware';

const authRouter = Router();

authRouter.post('/signup', verifyIfUserAlreadyRegistered, signup);

export { authRouter };
