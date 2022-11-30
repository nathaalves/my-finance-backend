import { faker } from '@faker-js/faker';
import { JWTPayload, Signin, Signup } from '../../src/types/userType';

export function generateSignupInformations(
  changeInformations?: Partial<Signup>
): Signup {
  const password =
    'aB0@$!%*?&' + faker.internet.password(10, false, /[0-9a-zA-Z@$!%*?&]/, '');

  let userInfo = {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password,
    confirm_password: password,
  };

  userInfo = { ...userInfo, ...changeInformations };

  return userInfo;
}

export function generateSigninInformations(
  changeInformations?: Partial<Signin>
): Signin {
  const password =
    'aB0@$!%*?&' + faker.internet.password(10, false, /[0-9a-zA-Z@$!%*?&]/, '');

  let userInfo = {
    email: faker.internet.email(),
    password,
  };

  userInfo = { ...userInfo, ...changeInformations };

  return userInfo;
}

export function generatePayload(
  changeInformations?: Partial<JWTPayload>
): JWTPayload {
  let userInfo = {
    id: faker.datatype.uuid(),
    name: faker.name.firstName(),
  };

  userInfo = { ...userInfo, ...changeInformations };

  return userInfo;
}
