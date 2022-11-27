import { sign } from 'jsonwebtoken';
import { JWTPayload } from '../types/userType';

function generateToken(payload: JWTPayload) {
  const SECRET_KEY = process.env.JWT_SECRET_KEY || 'secret';
  const EXPIRES_IN = process.env.JWT_EXPIRES_IN || '30s';

  const token = sign(payload, SECRET_KEY, { expiresIn: EXPIRES_IN });

  return { token };
}

export { generateToken };
