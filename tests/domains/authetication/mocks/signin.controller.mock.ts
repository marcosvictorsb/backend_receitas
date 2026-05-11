import { vi } from 'vitest';
import { SignInController } from '../../../../src/domains/authentication/controllers/signin.controller';

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

class SignInServiceMock {
  execute = vi.fn() as ReturnType<typeof vi.fn>;
}

export const userRepositoryMock = new UserRepositoryMock();
export const loggingMock = new CreateLoggerMock();
export const signInServiceMock = new SignInServiceMock();

export const signInControllerMock = new SignInController({
  service: signInServiceMock
});
