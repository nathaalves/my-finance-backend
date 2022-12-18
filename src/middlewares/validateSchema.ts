import { ObjectSchema } from 'joi';
import { Request, Response, NextFunction } from 'express';
import { SchemaError } from '../Errors/schemaError';

export function validateSchema(schema: ObjectSchema) {
  return (req: Request, _res: Response, next: NextFunction) => {
    let requestType = null;
    requestType = Object.keys(req.body).length !== 0 ? req.body : null;
    requestType = Object.keys(req.params).length !== 0 ? req.params : null;

    const { error } = schema.validate(requestType, {
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
