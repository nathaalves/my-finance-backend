import { faker } from '@faker-js/faker';
import type { JWTPayload, Signin, Signup } from '../../src/types/userTypes';

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
  let payloadInfo: JWTPayload = {
    sessionId: faker.datatype.uuid(),
    userId: faker.datatype.uuid(),
    name: faker.name.firstName(),
    type: 'access',
  };

  payloadInfo = { ...payloadInfo, ...changeInformations };

  return payloadInfo;
}
