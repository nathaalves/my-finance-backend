import { Request, Response, NextFunction } from 'express';
import { BusinessRuleError } from '../Errors/businessRuleError';
import { findUserByEmail } from '../repositories/userRepository';
import { compareHash } from '../utils/handleHash';
import { validateRefreshToken, validateToken } from '../utils/handleToken';

async function verifyIfUserAlreadyRegistered(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const { email } = req.body;

  const user = await findUserByEmail(email);

  if (user) {
    throw new BusinessRuleError('Usuário já registrado', 409);
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

async function verifyToken(req: Request, res: Response, next: NextFunction) {
  const authorization = req.headers.authorization;
  const token = authorization?.split(' ')[1];

  if (!token) {
    throw new BusinessRuleError('Token não encontrado.', 401);
  }

  const payload = validateToken(token);
  res.locals.payload = payload;

  next();
}

function verifyRefreshToken(req: Request, res: Response, next: NextFunction) {
  const authorization = req.headers.authorization;
  const refreshToken = authorization?.split(' ')[1];

  if (!refreshToken) {
    throw new BusinessRuleError('Refresh token não encontrado.', 401);
  }

  const payload = validateRefreshToken(refreshToken);
  res.locals.payload = payload;

  next();
}

export {
  checkIfPasswordIsCorrect,
  checkIfPasswordsMatch,
  verifyIfUserAlreadyRegistered,
  verifyIfUserExists,
  verifyRefreshToken,
  verifyToken,
};
