import joi from 'joi';
import { Signin, Signup } from '../types/userTypes';

const namePattern = /^[a-zA-Z]{2,}(?: [a-zA-Z]+){0,}$/;
const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const signupSchema = joi.object<Signup>({
  name: joi.string().pattern(namePattern).required().messages({
    'string.base': "O campo 'nome' deve ser do tipo texto",
    'string.pattern.base':
      "O campo 'nome' deve conter ao menos 2 letras enão possuir caracteres especiais ou números",
    'string.empty': "O campo 'nome' não pode estar vazio",
    'any.required': "O campo 'nome' é obrigatório",
  }),
  email: joi.string().email().required().messages({
    'string.base': "O campo 'email' deve ser do tipo texto",
    'string.email': 'Email inválido',
    'string.empty': "O campo 'email' não pode estar vazio",
    'any.required': "O campo 'email' é obrigatório",
  }),
  password: joi.string().min(8).pattern(passwordPattern).required().messages({
    'string.base': "O campo 'senha' deve ser do tipo texto",
    'string.min': 'A senha deve ter no mínimo 8 caracteres',
    'string.pattern.base':
      'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial (@$!%*?&)',
    'string.empty': "O campo 'senha' não pode estar vazio",
    'any.required': "O campo 'senha' é obrigatório",
  }),
  confirm_password: joi
    .string()
    .min(8)
    .pattern(passwordPattern)
    .required()
    .messages({
      'string.base': "O campo 'confirmação' deve ser do tipo texto",
      'string.min': 'A senha de confirmação deve ter no mínimo 8 caracteres',
      'string.pattern.base':
        'A senha de confirmação deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial (@$!%*?&)',
      'string.empty': "O campo 'confirmar senha' não pode estar vazio",
      'any.required': "O campo 'confirmar senha' é obrigatório",
    }),
});

export const signinSchema = joi.object<Signin>({
  email: joi.string().email().required().messages({
    'string.base': "O campo 'email' deve ser do tipo texto",
    'string.email': 'Email inválido',
    'string.empty': "O campo 'email' não pode estar vazio",
    'any.required': "O campo 'email' é obrigatório",
  }),
  password: joi.string().min(8).pattern(passwordPattern).required().messages({
    'string.base': "O campo 'senha deve ser do tipo texto",
    'string.min': 'A senha deve ter no mínimo 8 caracteres',
    'string.pattern.base':
      'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial (@$!%*?&)',
    'string.empty': "O campo 'senha' não pode estar vazio",
    'any.required': "O campo 'senha' é obrigatório",
  }),
});
