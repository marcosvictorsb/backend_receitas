import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  signInServiceMock,
  loggingMock,
  userRepositoryMock
} from '../mocks/signin.service.mock';

describe('SignInService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return login not found', async () => {
    const params = {
      login: 'nonexistent_login',
      password: 'any_password'
    };
    userRepositoryMock.find.mockResolvedValue(null);

    const { status, body } = await signInServiceMock.execute(params);

    expect(status).toBe(400);
    expect(body.message).toBe('Login ou senha incorretos');
    expect(loggingMock.info).toHaveBeenCalledWith(
      'Iniciando processo de login',
      { login: params.login }
    );
    expect(userRepositoryMock.find).toHaveBeenCalledWith({
      login: params.login
    });
    expect(userRepositoryMock.find).toHaveBeenCalledTimes(1);
    expect(loggingMock.info).toHaveBeenCalledWith('Login não encontrado', {
      login: params.login
    });
    expect(loggingMock.error).not.toHaveBeenCalled();
  });

  it('should return incorrect password', async () => {
    const params = {
      login: 'existing_login',
      password: 'wrong_password'
    };
    userRepositoryMock.find.mockResolvedValue({
      id: 'user_id',
      name: 'any_name',
      login: params.login,
      password: 'hashed_password'
    });
    vi.spyOn(signInServiceMock as any, 'comparePassword').mockResolvedValue(
      false
    );

    const { status, body } = await signInServiceMock.execute(params);

    expect(status).toBe(400);
    expect(body.message).toBe('Login ou senha incorretos');
    expect(loggingMock.info).toHaveBeenCalledWith(
      'Iniciando processo de login',
      { login: params.login }
    );
    expect(userRepositoryMock.find).toHaveBeenCalledWith({
      login: params.login
    });
    expect(userRepositoryMock.find).toHaveBeenCalledTimes(1);
    expect(loggingMock.info).toHaveBeenCalledWith('Senha incorreta', {
      login: params.login
    });
    expect(loggingMock.error).not.toHaveBeenCalled();
  });

  it('should return token on successful login', async () => {
    const params = {
      login: 'existing_login',
      password: 'correct_password'
    };
    userRepositoryMock.find.mockResolvedValue({
      id: 'user_id',
      name: 'any_name',
      login: params.login,
      password: 'hashed_password'
    });
    vi.spyOn(signInServiceMock as any, 'comparePassword').mockResolvedValue(
      true
    );
    vi.spyOn(signInServiceMock as any, 'generateToken').mockReturnValue(
      'jwt_token'
    );

    const { status, body } = await signInServiceMock.execute(params);

    expect(status).toBe(200);
    expect(body.token).toBe('jwt_token');
    expect(loggingMock.info).toHaveBeenCalledWith(
      'Iniciando processo de login',
      { login: params.login }
    );
    expect(userRepositoryMock.find).toHaveBeenCalledWith({
      login: params.login
    });
    expect(userRepositoryMock.find).toHaveBeenCalledTimes(1);
    expect(loggingMock.info).not.toHaveBeenCalledWith('Login não encontrado', {
      login: params.login
    });
    expect(loggingMock.info).not.toHaveBeenCalledWith('Senha incorreta', {
      login: params.login
    });
    expect(loggingMock.error).not.toHaveBeenCalled();
  });

  it('should handle unexpected errors', async () => {
    const params = {
      login: 'any_login',
      password: 'any_password'
    };
    userRepositoryMock.find.mockRejectedValue(new Error('Database error'));

    const { status, body } = await signInServiceMock.execute(params);

    expect(status).toBe(500);
    expect(body.message).toBe('Database error');
    expect(loggingMock.info).toHaveBeenCalledWith(
      'Iniciando processo de login',
      { login: params.login }
    );
    expect(userRepositoryMock.find).toHaveBeenCalledWith({
      login: params.login
    });
    expect(userRepositoryMock.find).toHaveBeenCalledTimes(1);
    expect(loggingMock.error).toHaveBeenCalledWith('Erro ao realizar login', {
      error: new Error('Database error')
    });
  });
});
