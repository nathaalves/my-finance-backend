import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors';
import { authRepository } from '../repositories/authRepository';
import { findUserByEmail } from '../repositories/userRepository';
import { compareHash } from '../utils/handleHash';
import { validateToken } from '../utils/handleToken';

async function verifyIfUserAlreadyRegistered(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const { email } = req.body;

  const user = await findUserByEmail(email);

  if (user) {
    throw new CustomError('Usuário já registrado', 409);
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
    throw new CustomError('Email ou senha inválido', 401);
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
    throw new CustomError('Password diferente do password de confirmação', 409);
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
    throw new CustomError('Email ou senha inválido', 401);
  }

  next();
}

function verifyToken(type: 'access' | 'refresh') {
  return async (req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined;

    if (type === 'access') {
      const authorization = req.headers.authorization;
      token = authorization?.split(' ')[1];
    }

    if (type === 'refresh') {
      token = req.cookies.refreshToken;
    }

    if (!token) {
      throw new CustomError('Token não encontrado.', 401);
    }

    const payload = validateToken(token, type);
    res.locals.payload = payload;

    next();
  };
}

async function verifyIfSessionExists(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  const { sessionId } = res.locals.payload;

  const session = await authRepository.findSession(sessionId);

  if (!session) {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });

    throw new CustomError('Sessão não encontrada.', 401);
  }

  next();
}

export {
  checkIfPasswordIsCorrect,
  checkIfPasswordsMatch,
  verifyIfUserAlreadyRegistered,
  verifyIfUserExists,
  verifyIfSessionExists,
  verifyToken,
};
