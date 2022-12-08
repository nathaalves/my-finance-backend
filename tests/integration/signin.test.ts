import {
  generateSigninInformations,
  generateSignupInformations,
} from '../factories/userFactory';
import { app } from '../../src/app';
import { initDB, disconnectDB } from '../../src/config/database';
import { cleanDb } from '../cleanDB';
import supertest from 'supertest';
import { verify } from 'jsonwebtoken';

const request = supertest(app);

beforeAll(async () => {
  await initDB();
  await cleanDb();
});

afterEach(async () => {
  await cleanDb();
});

describe('Log in', () => {
  it('should login with success passing valid informations', async () => {
    const signupInformations = generateSignupInformations();
    const { email, password } = signupInformations;

    await request.post('/auth/signup').send(signupInformations);

    const result = await request.post('/auth/signin').send({ email, password });

    const { token, refreshToken } = JSON.parse(result.text);

    const ACCESS_SECRET_KEY = `${process.env.JWT_SECRET_KEY}`;
    const tokenPayload = verify(token, ACCESS_SECRET_KEY);

    const REFRESH_SECRET_KEY = `${process.env.JWT_REFRESH_TOKEN_SECRET_KEY}`;
    const refreshPayload = verify(refreshToken, REFRESH_SECRET_KEY);

    expect(result.status).toBe(200);
    expect(tokenPayload).toHaveProperty('id');
    expect(tokenPayload).toHaveProperty('name');
    expect(refreshPayload).toHaveProperty('id');
    expect(refreshPayload).toHaveProperty('name');
  });

  it('should not allow login if a valid email is not submitted', async () => {
    const signinInformations = generateSigninInformations({
      email: 'invalid-email',
    });

    const result = await request.post('/auth/signin').send(signinInformations);

    expect(result.status).toBe(400);
  });

  it('should not allow login if valid password pattern is not submitted', async () => {
    const signinInformations = generateSigninInformations({
      password: 'invalid-email',
    });

    const result = await request.post('/auth/signin').send(signinInformations);

    expect(result.status).toBe(400);
  });

  it('should not allow login if user is not registered', async () => {
    const signinInformations = generateSigninInformations();

    const result = await request.post('/auth/signin').send(signinInformations);

    expect(result.status).toBe(401);
  });

  it('should not allow login if password is incorrect', async () => {
    const signupInformations = generateSignupInformations();
    const { email } = signupInformations;
    const password = '1aB$1aB$';

    await request.post('/auth/signup').send(signupInformations);

    const result = await request.post('/auth/signin').send({ email, password });

    expect(result.status).toBe(401);
  });
});

afterAll(async () => {
  await disconnectDB();
});
