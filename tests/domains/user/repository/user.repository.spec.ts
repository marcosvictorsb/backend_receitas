import { beforeEach, describe, expect, it, vi } from 'vitest';
import { UserRepository } from '../../../../src/domains/users/repository/user.repository';
import { ModelStatic } from 'sequelize';
import { LoggerMock } from '../../../mocks/logger.mock';

const modelMock = {
  findOne: vi.fn(),
  create: vi.fn()
};

const model = modelMock as unknown as ModelStatic<any>;
const logging = new LoggerMock();

export const userRepositoryMock = new UserRepository({
  model,
  logging
});

describe('UserRepository', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should find a user by login', async () => {
    const params = { login: 'any_login' };
    const userData = {
      id: 'user_id',
      name: 'any_name',
      login: params.login,
      password: 'hashed_password'
    };
    modelMock.findOne.mockResolvedValue(userData);

    const user = await userRepositoryMock.find(params);

    expect(user).toEqual({
      id: 'user_id',
      name: 'any_name',
      login: params.login,
      password: 'hashed_password'
    });
    expect(logging.info).toHaveBeenCalledWith('Buscando usuário', { params });
    expect(modelMock.findOne).toHaveBeenCalledWith({
      where: params
    });
    expect(modelMock.findOne).toHaveBeenCalledTimes(1);
  });

  it('should return undefined if user not found', async () => {
    const params = { login: 'nonexistent_login' };
    modelMock.findOne.mockResolvedValue(null);

    const user = await userRepositoryMock.find(params);

    expect(user).toBeUndefined();
    expect(logging.info).toHaveBeenCalledWith('Buscando usuário', { params });
    expect(modelMock.findOne).toHaveBeenCalledWith({
      where: params
    });
    expect(modelMock.findOne).toHaveBeenCalledTimes(1);
  });

  it('should create a new user', async () => {
    const params = {
      name: 'new_user',
      login: 'new_login',
      password: 'new_password'
    };
    const createdUserData = {
      id: 'new_user_id',
      name: params.name,
      login: params.login,
      password: 'hashed_password'
    };
    modelMock.create.mockResolvedValue(createdUserData);

    const user = await userRepositoryMock.create(params);

    expect(user).toEqual({
      id: 'new_user_id',
      name: params.name,
      login: params.login,
      password: 'hashed_password'
    });
    expect(logging.info).toHaveBeenCalledWith('Criando usuário', {
      params: { ...params, password: '****' }
    });
    expect(modelMock.create).toHaveBeenCalledWith(params);
    expect(modelMock.create).toHaveBeenCalledTimes(1);
  });
});
