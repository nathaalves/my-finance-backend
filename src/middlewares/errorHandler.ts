import { NextFunction, Request, Response } from 'express';
import { BusinessRuleError, SchemaError } from '../Errors';

export function errorHandler(
  err: SchemaError | BusinessRuleError,
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

  if (err instanceof BusinessRuleError) {
    return res.status(err.statusCode).send({
      message: err.message,
    });
  }

  res.status(500).send('Erro inesperado.');
}
