import supertest from 'supertest';
import { app } from '../../src/app';
import { generateToken } from '../../src/utils/handleToken';
import {
  generateSignupInformations,
  generatePayload,
} from '../factories/userFactory';
import { setTests } from '../setTests';

const request = supertest(app);

setTests();

describe('Get content', () => {
  it('should get content with success', async () => {
    const signupInformations = generateSignupInformations();
    const { email, password } = signupInformations;

    await request.post('/auth/signup').send(signupInformations);

    const {
      body: { accessToken },
    } = await request.post('/auth/signin').send({ email, password });

    const result = await request.get('/content').set({
      Authorization: `Bearer ${accessToken}`,
    });

    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty('inflow');
    expect(result.body).toHaveProperty('outflow');
  });

  it('should not allow get content if token was not sent', async () => {
    const result = await request.get('/content');

    expect(result.status).toBe(401);
    expect(result.body).toHaveProperty('message');
    expect(result.body.message).toBe('Token não encontrado.');
  });

  it('should not allow get content if token is invavlid', async () => {
    const result = await request.get('/content').set({
      Authorization: `Bearer invalid-token`,
    });

    expect(result.status).toBe(498);
    expect(result.body).toHaveProperty('message');
    expect(result.body.message).toBe('Token expirado ou inválido.');
  });

  it('should not allow get content if session was not found', async () => {
    const payload = generatePayload();
    const token = generateToken(payload);

    const result = await request.get('/content').set({
      Authorization: `Bearer ${token}`,
    });

    expect(result.status).toBe(401);
    expect(result.body).toHaveProperty('message');
    expect(result.body.message).toBe('Sessão não encontrada.');
  });
});
