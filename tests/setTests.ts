import { initDB, disconnectDB } from '../src/config/database';
import { cleanDb } from './cleanDB';

export function setTests() {
  beforeAll(async () => {
    await initDB();
    await cleanDb();
  });

  afterAll(async () => {
    await disconnectDB();
  });

  afterEach(async () => {
    await cleanDb();
  });
}
