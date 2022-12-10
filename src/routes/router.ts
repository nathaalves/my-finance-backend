import { Router } from 'express';
import { authRouter } from './authRouter';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../../swagger.json';
import { transactionRouter } from './transactionRouter';
import { contentRouter } from './contentRouter';

const router = Router();

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
router.use('/auth', authRouter);
router.use('/transaction', transactionRouter);
router.use('/content', contentRouter);

export { router };
