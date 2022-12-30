import { authRepository } from '../repositories/authRepository';

async function createSession(userId: string) {
  const session = await authRepository.createSession(userId);
  return session;
}

async function removeSession(sessionId: string) {
  await authRepository.removeSession(sessionId);
}

export const authService = {
  createSession,
  removeSession,
};
