import { verify } from 'jsonwebtoken';
import supertest from 'supertest';
import { app } from '../../src/app';
import { disconnectDB, initDB } from '../../src/config/database';
import { cleanDb } from '../cleanDB';
import {
  generateSignupInformations,
  generateSigninInformations,
} from '../factories/userFactory';

const request = supertest(app);

beforeAll(async () => {
  await initDB();
  await cleanDb();
});

afterEach(async () => {
  await cleanDb();
});

describe('Reauthentication', () => {
  it('should reauthenticate with success passing valid informations', async () => {
    const signupInformations = generateSignupInformations();
    const { email, password } = signupInformations;

    await request.post('/auth/signup').send(signupInformations);

    const signInResult = await request
      .post('/auth/signin')
      .send({ email, password });

    const { refreshToken } = JSON.parse(signInResult.text);

    const result = await request
      .post('/auth/reauthenticate')
      .send()
      .set({ Authorization: `Bearer ${refreshToken}` });

    const SECRET_KEY = `${process.env.JWT_SECRET_KEY}`;
    const payload = verify(result.text, SECRET_KEY);

    expect(result.status).toBe(200);
    expect(payload).toHaveProperty('id');
    expect(payload).toHaveProperty('name');
  });

  it('should not allow reauthentication if a valid refresh token is inválid', async () => {
    const result = await request
      .post('/auth/reauthenticate')
      .send()
      .set({ Authorization: 'Bearer invalid-refresh-token' });

    const { message } = JSON.parse(result.text);
    expect(message).toBe('Refresh token inválido.');
    expect(result.status).toBe(401);
  });

  it('should not allow reauthentication if a valid refresh token is not submitted', async () => {
    const result = await request
      .post('/auth/reauthenticate')
      .send()
      .set({ Authorization: 'Bearer ' });

    const { message } = JSON.parse(result.text);
    expect(message).toBe('Refresh token não encontrado.');
    expect(result.status).toBe(401);
  });
});

afterAll(async () => {
  await disconnectDB();
});
