import { signupInformations } from '../factories/userFactory';
import { app } from '../../src/app';
import supertest from 'supertest';

const request = supertest(app);

describe('Register', () => {
  it('should create a new user sending valid informations', async () => {
    const userInfo = signupInformations();

    const result = await request.post('/signup').send(userInfo);

    expect(result.status).toBe(201);
  });
});
