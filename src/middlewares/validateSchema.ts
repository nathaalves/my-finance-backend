import { ObjectSchema } from 'joi';
import { Request, Response, NextFunction } from 'express';
import { SchemaError } from '../Errors/schemaError';

export function validateSchema(schema: ObjectSchema) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      throw new SchemaError(
        'Corpo da requisição inválido',
        error.details.map((err) => err.message),
        400
      );
    }

    next();
  };
}
