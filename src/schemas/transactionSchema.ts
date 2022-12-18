import joi from 'joi';
import { TransactionBody } from '../types/transactionTypes';

const bodySchema = joi.object<TransactionBody>({
  description: joi.string().required(),
  note: joi.string(),
  value: joi.number().required(),
  categoryId: joi.string().required(),
  date: joi.date().required(),
});

const paramsSchema = joi.object<{ id: string }>({
  id: joi.string().uuid().required(),
});

export const transactionSchema = { bodySchema, paramsSchema };
