import { NextFunction, Request, Response } from 'express';
import { allowedOrigins } from '../config/cors';

export const validateCredentials = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const origin = req.headers.origin;

  if (!origin) {
    return next();
  }

  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', `${origin}`);
    res.header('Access-Control-Allow-Credentials', 'true');
  }
  next();
};
