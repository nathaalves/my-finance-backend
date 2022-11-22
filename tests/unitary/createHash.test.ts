import { createHash } from '../../src/utils/handleHash';
import { compareSync } from 'bcrypt';

describe('Encrypt password', () => {
  it('shold create a password hash with success', async () => {
    const password = 'test';

    const hash = createHash(password);
    const result = compareSync(password, hash);

    expect(result).toBe(true);
  });
});
