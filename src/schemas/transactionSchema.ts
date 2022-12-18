import joi from 'joi';
import { TransactionBody } from '../types/transactionTypes';

const addTransaction = joi.object<TransactionBody>({
  description: joi.string().required(),
  note: joi.string(),
  value: joi.number().required(),
  categoryId: joi.string().required(),
  date: joi.date().required(),
});

const deleteTransaction = joi.object({
  id: joi.string().uuid().required(),
});

export const transactionSchema = { addTransaction, deleteTransaction };
