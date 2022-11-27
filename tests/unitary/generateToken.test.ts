import { generateToken } from '../../src/utils/handleToken';
import { generatePayload } from '../factories/userFactory';
import { verify } from 'jsonwebtoken';

describe('generate token', () => {
  it('shold generate a token with success', async () => {
    const payload = generatePayload();

    const result = generateToken(payload);

    expect(result).toHaveProperty('token');
    const SECRET_KEY = `${process.env.JWT_SECRET_KEY}`;
    expect(verify(result.token, SECRET_KEY)).toHaveProperty('id');
  });
});
