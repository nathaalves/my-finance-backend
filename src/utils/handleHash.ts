import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import 'dotenv/config';

function createHash(data: string) {
  const SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS) || 12;

  const salt = genSaltSync(SALT_ROUNDS);

  const encryptedData = hashSync(data, salt);

  return encryptedData;
}

function compareHash(data: string, hash: string) {
  return compareSync(data, hash);
}

export { createHash, compareHash };
