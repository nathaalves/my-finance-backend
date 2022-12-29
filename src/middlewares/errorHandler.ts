import { NextFunction, Request, Response } from 'express';
import { CustomError, SchemaError } from '../errors';

export function errorHandler(
  err: SchemaError | CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error(err);

  if (err instanceof SchemaError) {
    return res.status(err.statusCode).send({
      message: err.message,
      details: err.details,
    });
  }

  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({
      message: err.message,
    });
  }

  res.status(500).send('Erro inesperado.');
}
