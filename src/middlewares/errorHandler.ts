import { NextFunction, Request, Response } from 'express';
import { BusinessRuleError, SchemaError } from '../Errors';

export function errorHandler(
  err: SchemaError | BusinessRuleError,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof SchemaError) {
    console.error(err);
    return res.status(err.statusCode).send({
      message: err.message,
      details: err.details,
    });
  }

  if (err instanceof BusinessRuleError) {
    console.error(err);
    return res.status(err.statusCode).send({
      message: err.message,
    });
  }
}
