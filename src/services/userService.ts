import { userRepository } from '../repositories/userRepository';
import { UserData } from '../types/userType';
import { createHash } from '../utils/handleHash';

async function encryptPassword(userData: UserData) {
  const { email, name, password } = userData;

  const password_hash = createHash(password);
  const { id } = await userRepository.addUser({
    name,
    email,
    password_hash,
  });

  return id;
}

export { encryptPassword };