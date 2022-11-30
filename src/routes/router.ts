import { Router } from 'express';
import { authRouter } from './authRouter';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../../swagger.json';

const router = Router();

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
router.use('/auth', authRouter);

export { router };
