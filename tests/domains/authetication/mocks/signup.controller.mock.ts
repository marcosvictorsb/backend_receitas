import { vi } from 'vitest';
import { SignUpController } from '../../../../src/domains/authentication/controllers/signup.controller';

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

class SignUpServiceMock {
  execute = vi.fn() as ReturnType<typeof vi.fn>;
}

export const userRepositoryMock = new UserRepositoryMock();
export const loggingMock = new CreateLoggerMock();
export const signUpServiceMock = new SignUpServiceMock();

export const signUpControllerMock = new SignUpController({
  service: signUpServiceMock
});
