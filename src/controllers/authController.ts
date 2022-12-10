import { Request, Response } from 'express';
import { encryptPassword } from '../services/userService';
import { generateRefreshToken, generateToken } from '../utils/handleToken';

async function signup(req: Request, res: Response) {
  const { name, email, password } = req.body;

  const id = await encryptPassword({ name, email, password });

  res.status(201).send({ id });
}

async function signin(req: Request, res: Response) {
  const { id, name } = res.locals.user;

  const token = generateToken({ id, name });
  const refreshToken = generateRefreshToken({ id, name });

  res.status(200).send({ token, refreshToken });
}

async function reauthenticate(req: Request, res: Response) {
  const { id, name } = res.locals.payload;

  const token = generateToken({ id, name });

  res.status(200).send(token);
}

export { signup, signin, reauthenticate };
