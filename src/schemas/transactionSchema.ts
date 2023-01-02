import joi from 'joi';
import { TransactionBody } from '../types/transactionTypes';

const bodySchema = joi.object<TransactionBody>({
  description: joi.string().required().messages({
    'string.base': "O campo 'descrição' deve ser do tipo texto",
    'string.empty': "O campo 'descrição' não pode estar vazio",
    'any.required': "O campo 'descrição' é obrigatório",
  }),
  note: joi.string().allow('').messages({
    'string.base': "O campo 'descrição' deve ser do tipo texto",
  }),
  value: joi.number().integer().min(1).required().messages({
    'number.integer': "O campo 'valor' deve ser do tipo inteiro",
    'any.required': "O campo 'valor' é obrigatório",
    'number.min': "O campo 'valor' não pose ser igual a 0",
  }),
  categoryId: joi.string().uuid().required().messages({
    'string.guid': "O campo 'categoryId' deve ser do tipo GUID",
    'string.empty': "O campo 'categoryId' não pode estar vazio",
    'any.required': "O campo 'categoryId' é obrigatório",
  }),
  date: joi.date().required().messages({
    'date.base': "O campo 'data' é inválido",
    'any.required': "O campo 'data' é obrigatório",
  }),
});

const transactionIdParamsSchema = joi.object<{ transactionId: string }>({
  transactionId: joi.string().uuid().required().messages({
    'string.guid': "O parâmetro 'transactionId' deve ser do tipo GUID",
    'string.empty': "O parâmetro 'transactionId' não pode estar vazio",
    'any.required': "O parâmetro 'transactionId' é obrigatório",
  }),
});

export const transactionSchema = { bodySchema, transactionIdParamsSchema };
