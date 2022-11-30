import { NextFunction, Request, Response } from 'express';
import { SchemaError } from '../Errors/schemaError';

export function errorHandler(
  err: SchemaError,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof SchemaError) {
    console.error(err);
    return res.status(err.statusCode).send({
      error: err.error,
      details: err.details,
    });
  }
}
