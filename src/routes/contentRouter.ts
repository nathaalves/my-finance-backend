import { Router } from 'express';
import { getContent } from '../controllers/contentController';
import { verifyToken } from '../middlewares/authMidleware';

const SECRET_KEY = process.env.JWT_ACCESS_TOKEN_SECRET_KEY;

const contentRouter = Router();

contentRouter.get('/', verifyToken(SECRET_KEY), getContent);

export { contentRouter };
