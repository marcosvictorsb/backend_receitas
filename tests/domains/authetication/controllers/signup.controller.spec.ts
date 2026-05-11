import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  signUpServiceMock,
  signUpControllerMock
} from '../mocks/signup.controller.mock';
import { makeResponseMock } from '../../../mocks/response.mock';

describe('SignUpController', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return login already exists', async () => {
    const request: any = {
      body: {
        name: 'any_name',
        login: 'any_login',
        password: 'any_password'
      }
    };

    signUpServiceMock.execute.mockResolvedValue({
      status: 400,
      body: { message: 'Login já existe' }
    });

    const response = makeResponseMock();
    await signUpControllerMock.handle(request, response);

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({ message: 'Login já existe' });
    expect(signUpServiceMock.execute).toHaveBeenCalledWith(request.body);
    expect(signUpServiceMock.execute).toHaveBeenCalledTimes(1);
  });

  it('should create a new user', async () => {
    const params = {
      name: 'new_user',
      login: 'new_login',
      password: 'new_password'
    };
    signUpServiceMock.execute.mockResolvedValue({
      status: 201,
      body: {
        user: {
          id: 'new_user_id',
          name: params.name,
          login: params.login
        }
      }
    });

    const request: any = {
      body: params
    };
    const response = makeResponseMock();
    await signUpControllerMock.handle(request, response);

    expect(response.status).toHaveBeenCalledWith(201);
    expect(response.json).toHaveBeenCalledWith({
      user: {
        id: 'new_user_id',
        name: params.name,
        login: params.login
      }
    });
    expect(signUpServiceMock.execute).toHaveBeenCalledWith(params);
    expect(signUpServiceMock.execute).toHaveBeenCalledTimes(1);
  });
});
