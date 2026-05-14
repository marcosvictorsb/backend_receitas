import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  signUpServiceMock,
  loggingMock,
  userRepositoryMock
} from '../mocks/signup.service.mock';

describe('SignUpService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return login already exists', async () => {
    const params = {
      name: 'any_name',
      login: 'any_login',
      password: 'any_password'
    };
    userRepositoryMock.find.mockResolvedValue({ id: 'existing_user_id' });

    const { status, body } = await signUpServiceMock.execute(params);

    expect(status).toBe(400);
    expect(body.message).toBe(
      'Já existe uma conta com este login. Tente outro'
    );
    expect(loggingMock.info).toHaveBeenCalledWith(
      'Iniciando processo de cadastro',
      { name: params.name, login: params.login }
    );
    expect(userRepositoryMock.find).toHaveBeenCalledWith({
      login: params.login
    });
    expect(userRepositoryMock.find).toHaveBeenCalledTimes(1);
    expect(loggingMock.info).toHaveBeenCalledWith(
      'Já existe uma conta com este login. Tente outro',
      {
        login: params.login
      }
    );
    expect(userRepositoryMock.create).not.toHaveBeenCalled();
    expect(loggingMock.error).not.toHaveBeenCalled();
  });

  it('should create a new user', async () => {
    const params = {
      name: 'new_user',
      login: 'new_login',
      password: 'new_password'
    };
    userRepositoryMock.find.mockResolvedValue(null);
    userRepositoryMock.create.mockResolvedValue({
      id: 'new_user_id',
      name: params.name,
      login: params.login,
      password: 'hashed_password'
    });

    const { status, body } = await signUpServiceMock.execute(params);

    expect(status).toBe(201);
    expect(body.user).toEqual({
      id: 'new_user_id',
      name: params.name,
      login: params.login
    });
    expect(loggingMock.info).toHaveBeenCalledWith(
      'Iniciando processo de cadastro',
      { name: params.name, login: params.login }
    );
    expect(userRepositoryMock.find).toHaveBeenCalledWith({
      login: params.login
    });
    expect(userRepositoryMock.find).toHaveBeenCalledTimes(1);
    expect(loggingMock.info).not.toHaveBeenCalledWith(
      'Já existe uma conta com este login. Tente outro',
      {
        login: params.login
      }
    );
    expect(userRepositoryMock.create).toHaveBeenCalledWith({
      name: params.name,
      login: params.login,
      password: expect.any(String)
    });
    expect(userRepositoryMock.create).toHaveBeenCalledTimes(1);
    expect(loggingMock.error).not.toHaveBeenCalled();
  });

  it('should handle errors during user creation', async () => {
    const params = {
      name: 'error_user',
      login: 'error_login',
      password: 'error_password'
    };
    const errorMessage = 'Erro ao cadastrar usuário';
    userRepositoryMock.find.mockResolvedValue(null);
    userRepositoryMock.create.mockRejectedValue(new Error(errorMessage));

    const { status, body } = await signUpServiceMock.execute(params);

    expect(status).toBe(500);
    expect(body.message).toBe(errorMessage);
    expect(loggingMock.info).toHaveBeenCalledWith(
      'Iniciando processo de cadastro',
      { name: params.name, login: params.login }
    );
    expect(userRepositoryMock.find).toHaveBeenCalledWith({
      login: params.login
    });
    expect(userRepositoryMock.find).toHaveBeenCalledTimes(1);
    expect(loggingMock.info).not.toHaveBeenCalledWith(
      'Já existe uma conta com este login. Tente outro',
      {
        login: params.login
      }
    );
    expect(userRepositoryMock.create).toHaveBeenCalledWith({
      name: params.name,
      login: params.login,
      password: expect.any(String)
    });
    expect(userRepositoryMock.create).toHaveBeenCalledTimes(1);
    expect(loggingMock.error).toHaveBeenCalledWith(
      'Erro ao cadastrar usuário',
      {
        error: expect.any(Error)
      }
    );
  });
});
