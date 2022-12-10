import { sign, verify } from 'jsonwebtoken';
import { BusinessRuleError } from '../Errors';
import { JWTPayload } from '../types/userType';

function generateToken(payload: JWTPayload) {
  const SECRET_KEY = process.env.JWT_SECRET_KEY || 'secret';
  const EXPIRES_IN = process.env.JWT_EXPIRES_IN || '30s';

  const token = sign(payload, SECRET_KEY, { expiresIn: EXPIRES_IN });

  return token;
}

function validateToken(token: string) {
  const SECRET_KEY = process.env.JWT_SECRET_KEY || 'secret';

  try {
    const payload = verify(token, SECRET_KEY);

    return payload;
  } catch (error) {
    throw new BusinessRuleError('Token inválido.', 401);
  }
}

function generateRefreshToken(payload: JWTPayload) {
  const SECRET_KEY = process.env.JWT_REFRESH_TOKEN_SECRET_KEY || 'secret';
  const EXPIRES_IN = process.env.JWT_REFRESH_TOKEN_EXPIRES_IN || '40s';

  const refreshToken = sign(payload, SECRET_KEY, { expiresIn: EXPIRES_IN });

  return refreshToken;
}

function validateRefreshToken(refreshToken: string) {
  const SECRET_KEY = process.env.JWT_REFRESH_TOKEN_SECRET_KEY || 'secret';

  try {
    const payload = verify(refreshToken, SECRET_KEY);

    return payload;
  } catch (error) {
    throw new BusinessRuleError('Refresh token inválido.', 401);
  }
}

export {
  generateRefreshToken,
  generateToken,
  validateRefreshToken,
  validateToken,
};
