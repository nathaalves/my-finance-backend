import { faker } from '@faker-js/faker';
import { CreateUser } from '../../src/types/userType';

export function signupInformations(
  changeInformations?: Partial<CreateUser>
): CreateUser {
  const password = faker.internet.password();

  let userInfo = {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password,
    confirm_password: password,
  };

  userInfo = { ...userInfo, ...changeInformations };

  return userInfo;
}
