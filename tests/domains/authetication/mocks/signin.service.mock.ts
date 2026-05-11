import { vi } from 'vitest';
import { SignInService } from '../../../../src/domains/authentication/services/signin.service';
import { LoggerMock } from '../../../mocks/logger.mock';

class UserRepositoryMock {
  find = vi.fn() as ReturnType<typeof vi.fn>;
  create = vi.fn() as ReturnType<typeof vi.fn>;
}

export const userRepositoryMock = new UserRepositoryMock();
export const loggingMock = new LoggerMock();
export const signInServiceMock = new SignInService({
  userRepository: userRepositoryMock,
  logging: loggingMock
});
