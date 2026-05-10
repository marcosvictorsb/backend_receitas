import { vi } from 'vitest';
import { SignUpService } from '../../../../src/domains/authentication/services/signup.service';

class UserRepositoryMock {
  find = vi.fn() as ReturnType<typeof vi.fn>;
  create = vi.fn() as ReturnType<typeof vi.fn>;
}

class CreateLoggerMock {
  info = vi.fn() as ReturnType<typeof vi.fn>;
  error = vi.fn() as ReturnType<typeof vi.fn>;
  warn = vi.fn() as ReturnType<typeof vi.fn>;
  debug = vi.fn() as ReturnType<typeof vi.fn>;
}

export const userRepositoryMock = new UserRepositoryMock();
export const loggingMock = new CreateLoggerMock();
export const signUpServiceMock = new SignUpService({
  userRepository: userRepositoryMock,
  logging: loggingMock
});
