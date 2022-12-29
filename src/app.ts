import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { router } from './routes/router';
import { errorHandler } from './middlewares/errorHandler';
import { options } from './config/cors';
import { validateCredentials } from './middlewares/validateCredentials';

const app = express();

app.use(validateCredentials);

app.use(cors(options));
app.use(express.json());
app.use(cookieParser());

app.use(router);

app.use(errorHandler);

export { app };
