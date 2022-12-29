import { ObjectSchema } from 'joi';
import { Request, Response, NextFunction } from 'express';
import { SchemaError } from '../errors';

function validate(schema: ObjectSchema, type: 'body' | 'params') {
  return (req: Request, _res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[type as keyof Request], {
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

function params(schema: ObjectSchema) {
  return validate(schema, 'params');
}

function body(schema: ObjectSchema) {
  return validate(schema, 'body');
}

export const validateSchema = { params, body };
