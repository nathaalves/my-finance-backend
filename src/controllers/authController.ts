import { Request, Response } from 'express';
import { encryptPassword } from '../services/userService';

async function signup(req: Request, res: Response) {
  const { name, email, password } = req.body;

  const id = await encryptPassword({ name, email, password });

  res.status(201).send({ id });
}

export { signup };
