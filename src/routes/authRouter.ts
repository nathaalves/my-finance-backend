import { Router } from 'express';
import { signup } from '../controllers/authController';

const authRouter = Router();

authRouter.post('/signup', signup);

export { authRouter };
