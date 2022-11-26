import { faker } from '@faker-js/faker';
import { Signup } from '../../src/types/userType';

export function signupInformations(
  changeInformations?: Partial<Signup>
): Signup {
  const password = faker.internet.password(
    100,
    false,
    /[0-9a-zA-Z@$!%*?&]/,
    ''
  );

  let userInfo = {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password,
    confirm_password: password,
  };

  userInfo = { ...userInfo, ...changeInformations };

  return userInfo;
}
