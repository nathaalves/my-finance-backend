import { Router } from 'express';
import { getContent } from '../controllers/contentController';
import { verifyToken } from '../middlewares/authMidleware';

const contentRouter = Router();

contentRouter.get('/', verifyToken('access'), getContent);

export { contentRouter };
