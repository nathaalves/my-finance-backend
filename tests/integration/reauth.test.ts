import { verify } from 'jsonwebtoken';
import supertest from 'supertest';
import { app } from '../../src/app';
import {
  generateSignupInformations,
  generateSigninInformations,
} from '../factories/userFactory';
import { setTests } from '../setTests';

const request = supertest(app);

setTests();

describe('Reauthentication', () => {
  it('should not allow reauthentication if a valid refresh token is not submitted', async () => {
    const result = await request
      .post('/auth/reauthenticate')
      .send()
      .set({ Authorization: 'Bearer ' });

    const { message } = JSON.parse(result.text);
    expect(message).toBe('Token não encontrado.');
    expect(result.status).toBe(401);
  });
});
