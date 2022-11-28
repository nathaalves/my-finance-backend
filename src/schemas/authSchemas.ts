import joi from 'joi';
import { Signin, Signup } from '../types/userType';

const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const signupSchema = joi.object<Signup>({
  name: joi
    .string()
    .regex(/^[a-zA-Z]+$/)
    .required(),
  email: joi.string().email().required(),
  password: joi.string().min(8).pattern(passwordPattern).required(),
  confirm_password: joi.string().min(8).pattern(passwordPattern).required(),
});

export const signinSchema = joi.object<Signin>({
  email: joi.string().email().required(),
  password: joi.string().min(8).pattern(passwordPattern).required(),
});
