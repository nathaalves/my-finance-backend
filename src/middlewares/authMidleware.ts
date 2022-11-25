import { Request, Response, NextFunction } from 'express';
import { findUserByEmail } from '../repositories/userRepository';

async function verifyIfUserAlreadyRegistered(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email } = req.body;

  const user = await findUserByEmail(email);

  if (user) {
    return res.status(409).send({ message: 'User already registered' });
  }

  next();
}

export { verifyIfUserAlreadyRegistered };
