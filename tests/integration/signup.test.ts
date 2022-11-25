import { signupInformations } from '../factories/userFactory';
import { app } from '../../src/app';
import { initDB, disconnectDB } from '../../src/config/database';
import { cleanDb } from '../cleanDB';
import supertest from 'supertest';

const request = supertest(app);

beforeAll(async () => {
  await initDB();
  await cleanDb();
});

afterEach(async () => {
  await cleanDb();
});

describe('Register', () => {
  it('should create a new user sending valid informations', async () => {
    const userInfo = signupInformations();

    const result = await request.post('/signup').send(userInfo);

    expect(result.status).toBe(201);
  });
});

afterAll(async () => {
  await disconnectDB();
});
