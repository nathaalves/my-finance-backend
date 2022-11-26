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

async function checkIfPasswordsMatch(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { password, confirm_password } = req.body;

  if (password !== confirm_password) {
    res.status(409).send('passwords does not match');
  } else {
    next();
  }
}

export { verifyIfUserAlreadyRegistered, checkIfPasswordsMatch };
