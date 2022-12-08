import {
  generateRefreshToken,
  generateToken,
  validateRefreshToken,
} from '../../src/utils/handleToken';
import { generatePayload } from '../factories/userFactory';
import { sign, verify } from 'jsonwebtoken';

describe('generate token', () => {
  it('shold generate a access token with success', async () => {
    const payload = generatePayload();

    const result = generateToken(payload);

    expect(typeof result).toBe('string');
    const SECRET_KEY = `${process.env.JWT_SECRET_KEY}`;
    expect(verify(result, SECRET_KEY)).toHaveProperty('id');
  });

  it('shold generate a refresh token with success', async () => {
    const payload = generatePayload();

    const result = generateRefreshToken(payload);

    expect(typeof result).toBe('string');
    const SECRET_KEY = `${process.env.JWT_REFRESH_TOKEN_SECRET_KEY}`;
    expect(verify(result, SECRET_KEY)).toHaveProperty('id');
  });
});

describe('validate token', () => {
  it('shold validate a refresh token with success', async () => {
    const payload = generatePayload();

    const refreshToken = sign(
      payload,
      `${process.env.JWT_REFRESH_TOKEN_SECRET_KEY}`
    );

    const result = validateRefreshToken(refreshToken);

    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('name');
  });

  it('shold not validate a refresh token', async () => {
    const payload = generatePayload();

    const refreshToken = sign(
      payload,
      `${process.env.JWT_REFRESH_TOKEN_SECRET_KEY}`,
      { expiresIn: 1 }
    );
    setTimeout(() => {
      const result = validateRefreshToken(refreshToken);

      expect(result).toHaveProperty('message');
      expect(result).toHaveProperty('statusCode');
    }, 2000);
  });
});
