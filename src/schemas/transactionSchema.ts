import joi from 'joi';
import { TransactionBody } from '../types/transactionTypes';

export const transactionSchema = joi.object<TransactionBody>({
  description: joi.string().required(),
  note: joi.string(),
  value: joi.number().required(),
  categoryId: joi.string().required(),
  date: joi.date().required(),
});
