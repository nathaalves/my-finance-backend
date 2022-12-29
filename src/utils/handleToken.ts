import { sign, verify } from 'jsonwebtoken';
import { CustomError } from '../errors';
import { JWTPayload } from '../types/userTypes';

function loadEnvs(type: 'access' | 'refresh') {
  let secretKey: string | undefined;
  let expiresIn: string | undefined;

  if (type === 'access') {
    secretKey = process.env.JWT_ACCESS_TOKEN_SECRET_KEY;
    expiresIn = process.env.JWT_ACCESS_TOKEN_EXPIRES_IN;
  }

  if (type === 'refresh') {
    secretKey = process.env.JWT_REFRESH_TOKEN_SECRET_KEY;
    expiresIn = process.env.JWT_REFRESH_TOKEN_EXPIRES_IN;
  }

  if (!secretKey) {
    throw new CustomError(
      'É necessário a definição de uma chave secreta para a geração do token.',
      409
    );
  }

  if (!expiresIn) {
    throw new CustomError(
      'É nececssário a definição do tempo de expiração do token.',
      409
    );
  }

  return { secretKey, expiresIn };
}

function generateToken(payload: JWTPayload) {
  const { secretKey, expiresIn } = loadEnvs(payload.type);

  return sign(payload, secretKey, { expiresIn });
}

function validateToken(token: string, type: 'access' | 'refresh') {
  const { secretKey } = loadEnvs(type);

  const payload = verify(token, secretKey, (err, decoded) => {
    if (err) {
      throw new CustomError('Token expirado ou inválido.', 498);
    }
    return decoded;
  });

  return payload as unknown as JWTPayload;
}

export { generateToken, validateToken };
