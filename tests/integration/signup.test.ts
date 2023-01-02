import { generateSignupInformations } from '../factories/userFactory';
import { app } from '../../src/app';
import supertest from 'supertest';
import { setTests } from '../setTests';

const request = supertest(app);

setTests();

describe('Register', () => {
  it('should create a new user sending valid informations', async () => {
    const userInfo = generateSignupInformations();

    const result = await request.post('/auth/signup').send(userInfo);

    expect(result.status).toBe(201);
  });

  it('should not allow registration if the user is already registered', async () => {
    const userInfo = generateSignupInformations();

    await request.post('/auth/signup').send(userInfo);

    const result = await request.post('/auth/signup').send(userInfo);

    expect(result.status).toBe(409);
  });

  it('should not accept registration if email is invalid', async () => {
    const userInfo = generateSignupInformations({
      email: 'invalid-email',
    });

    const result = await request.post('/auth/signup').send(userInfo);

    expect(result.status).toBe(400);
  });

  it('shold not accept registration if name is invalid', async () => {
    const userInfo = generateSignupInformations({
      name: 'invalid-name',
    });

    const result = await request.post('/auth/signup').send(userInfo);

    expect(result.status).toBe(400);
  });

  it('shold not accept registration if password or caonfirm_password is invalid', async () => {
    const userInfo = generateSignupInformations({
      password: 'invalid-password',
      confirm_password: 'invalid-password',
    });

    const result = await request.post('/auth/signup').send(userInfo);

    expect(result.status).toBe(400);
  });

  it('shold not accept registration if password and caonfirm_password contains less than 8 characters', async () => {
    const userInfo = generateSignupInformations({
      password: '1aB$',
      confirm_password: '1aB$',
    });

    const result = await request.post('/auth/signup').send(userInfo);

    expect(result.status).toBe(400);
  });

  it('shold not accept registration if password does not matchs with caonfirm_password', async () => {
    const userInfo = generateSignupInformations({
      confirm_password: '1aB$1aB$1aB$',
    });

    const result = await request.post('/auth/signup').send(userInfo);

    expect(result.status).toBe(409);
  });
});
