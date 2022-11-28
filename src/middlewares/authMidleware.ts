import { Request, Response, NextFunction } from 'express';
import { findUserByEmail } from '../repositories/userRepository';
import { compareHash } from '../utils/handleHash';

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

async function verifyIfUserExists(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email } = req.body;

  const user = await findUserByEmail(email);

  if (!user) {
    return res.status(401).send({ message: 'Invalid password or e-mail!' });
  }

  res.locals.user = user;
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

async function checkIfPasswordIsCorrect(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { password } = req.body;
  const { password_hash: passwordHash } = res.locals.user;

  const isValid = compareHash(password, `${passwordHash}`);

  if (!isValid) {
    return res.status(401).send('Invalid e-mail or password!');
  }

  next();
}

export {
  verifyIfUserAlreadyRegistered,
  verifyIfUserExists,
  checkIfPasswordsMatch,
  checkIfPasswordIsCorrect,
};
