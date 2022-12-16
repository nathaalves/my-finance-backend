import { Request, Response } from 'express';
import { encryptPassword } from '../services/userService';
import { generateToken } from '../utils/handleToken';

async function signup(req: Request, res: Response) {
  const { name, email, password } = req.body;

  const id = await encryptPassword({ name, email, password });

  res.status(201).send({ id });
}

async function signin(req: Request, res: Response) {
  const { id, name } = res.locals.user;

  const SECRET_KEY = process.env.JWT_REFRESH_TOKEN_SECRET_KEY;
  const EXPIRES_IN = process.env.JWT_REFRESH_TOKEN_EXPIRES_IN;

  const refreshToken = generateToken({ id, name }, SECRET_KEY, EXPIRES_IN);

  res.status(200).send({ refreshToken });
}

async function reauthenticate(req: Request, res: Response) {
  const { id, name } = res.locals.payload;

  const token = generateToken({ id, name });

  res.status(200).send(token);
}

export { signup, signin, reauthenticate };
