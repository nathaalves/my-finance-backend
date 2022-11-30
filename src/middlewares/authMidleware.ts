import { Request, Response, NextFunction } from 'express';
import { BusinessRuleError } from '../Errors/businessRuleError';
import { findUserByEmail } from '../repositories/userRepository';
import { compareHash } from '../utils/handleHash';

async function verifyIfUserAlreadyRegistered(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const { email } = req.body;

  const user = await findUserByEmail(email);

  if (user) {
    throw new BusinessRuleError('Usuário já registrado', 401);
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
    throw new BusinessRuleError('Email ou senha inválido', 401);
  }

  res.locals.user = user;
  next();
}

async function checkIfPasswordsMatch(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const { password, confirm_password } = req.body;

  if (password !== confirm_password) {
    throw new BusinessRuleError(
      'Password diferente do password de confirmação',
      409
    );
  }

  next();
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
    throw new BusinessRuleError('Email ou senha inválido', 401);
  }

  next();
}

export {
  verifyIfUserAlreadyRegistered,
  verifyIfUserExists,
  checkIfPasswordsMatch,
  checkIfPasswordIsCorrect,
};
