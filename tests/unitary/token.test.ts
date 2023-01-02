import { generateToken, validateToken } from '../../src/utils/handleToken';
import { generatePayload } from '../factories/userFactory';
import { sign, verify } from 'jsonwebtoken';

describe('generate token', () => {
  it('shold generate a access token with success', async () => {
    const payload = generatePayload();

    const result = generateToken(payload);

    const SECRET_KEY = `${process.env.JWT_ACCESS_TOKEN_SECRET_KEY}`;

    expect(typeof result).toBe('string');
    expect(verify(result, SECRET_KEY)).toHaveProperty('userId');
  });

  it('shold generate a refresh token with success', async () => {
    const payload = generatePayload({
      type: 'refresh',
    });

    const token = generateToken(payload);

    const SECRET_KEY = `${process.env.JWT_REFRESH_TOKEN_SECRET_KEY}`;
    const decodedPayload = verify(token, SECRET_KEY);

    expect(typeof token).toBe('string');
    expect(decodedPayload).toHaveProperty('userId');
    expect(decodedPayload).toHaveProperty('name');
    expect(decodedPayload).toHaveProperty('sessionId');
  });
});

describe('validate token', () => {
  it('shold validate a refresh token with success', async () => {
    const payload = generatePayload();

    const refreshToken = sign(
      payload,
      `${process.env.JWT_REFRESH_TOKEN_SECRET_KEY}`
    );

    const result = validateToken(refreshToken, 'refresh');

    expect(result).toHaveProperty('userId');
    expect(result).toHaveProperty('name');
    expect(result).toHaveProperty('sessionId');
  });

  it('shold not validate a refresh token', async () => {
    const payload = generatePayload();

    const refreshToken = sign(
      payload,
      `${process.env.JWT_REFRESH_TOKEN_SECRET_KEY}`,
      { expiresIn: 1 }
    );
    setTimeout(() => {
      const result = validateToken(refreshToken, 'refresh');

      expect(result).toHaveProperty('message');
      expect(result).toHaveProperty('statusCode');
    }, 2000);
  });
});
