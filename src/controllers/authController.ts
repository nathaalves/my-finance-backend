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

  const token = generateToken({ id, name });

  res.status(200).send(token);
}

export { signup, signin };
