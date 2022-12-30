import { Request, Response } from 'express';
import { authService } from '../services/authService';
import { encryptPassword } from '../services/userService';
import { generateToken } from '../utils/handleToken';

async function signup(req: Request, res: Response) {
  const { name, email, password } = req.body;

  const id = await encryptPassword({ name, email, password });

  res.status(201).send({ id });
}

async function signin(_req: Request, res: Response) {
  const { id: userId, name } = res.locals.user;

  const { id: sessionId } = await authService.createSession(userId);

  const refreshToken = generateToken({
    sessionId,
    userId,
    name,
    type: 'refresh',
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    maxAge: 2 * 60 * 60 * 1000,
  });
  res.sendStatus(200);
}

async function reauthenticate(_req: Request, res: Response) {
  const { userId, name, sessionId } = res.locals.payload;

  const accessToken = generateToken({
    sessionId,
    userId,
    name,
    type: 'access',
  });

  res.status(200).send({ accessToken });
}

async function logout(_req: Request, res: Response) {
  const { sessionId } = res.locals.payload;
  await authService.removeSession(sessionId);
  res.status(200).send('Logout feito com sucesso.');
}

export { signup, signin, logout, reauthenticate };
