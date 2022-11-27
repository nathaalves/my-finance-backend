import { faker } from '@faker-js/faker';
import { JWTPayload, Signin, Signup } from '../../src/types/userType';

export function generateSignupInformations(
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
