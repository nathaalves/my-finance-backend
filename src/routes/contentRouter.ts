import { Router } from 'express';
import { getContent } from '../controllers/contentController';
import {
  verifyIfSessionExists,
  verifyToken,
} from '../middlewares/authMidleware';

const contentRouter = Router();

contentRouter.get(
  '/',
  verifyToken('access'),
  verifyIfSessionExists,
  getContent
);

export { contentRouter };
