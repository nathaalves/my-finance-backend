import { sign, verify } from 'jsonwebtoken';
import { BusinessRuleError } from '../Errors';
import { JWTPayload } from '../types/userType';

function generateToken(
  payload: JWTPayload,
  secretKey: string | undefined,
  expiresIn: string | undefined
) {
  if (!secretKey) {
    throw new BusinessRuleError(
      'É necessário a definição de uma chave secreta para a geração do token.',
      409
    );
  }

  if (!expiresIn) {
    throw new BusinessRuleError(
      'É nececssário a definição do tempo de expiração do token.',
      409
    );
  }

  return sign(payload, secretKey, { expiresIn });
}

function validateToken(token: string, secretKey: string) {
  try {
    const payload = verify(token, secretKey);

    return payload;
  } catch (error) {
    throw new BusinessRuleError('Token inválido.', 401);
  }
}

export { generateToken, validateToken };
