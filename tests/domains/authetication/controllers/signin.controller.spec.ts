import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  signInControllerMock,
  signInServiceMock
} from '../mocks/signin.controller.mock';
import { makeResponseMock } from '../../../mocks/response.mock';

describe('SignInController', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return invalid credentials', async () => {
    const request: any = {
      body: {
        login: 'any_login',
        password: 'any_password'
      }
    };

    signInServiceMock.execute.mockResolvedValue({
      status: 401,
      body: { message: 'Credenciais inválidas' }
    });

    const response = makeResponseMock();
    await signInControllerMock.handle(request, response);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.json).toHaveBeenCalledWith({
      message: 'Credenciais inválidas'
    });
    expect(signInServiceMock.execute).toHaveBeenCalledWith(request.body);
    expect(signInServiceMock.execute).toHaveBeenCalledTimes(1);
  });

  it('should return a token', async () => {
    const params = {
      login: 'valid_login',
      password: 'valid_password'
    };
    signInServiceMock.execute.mockResolvedValue({
      status: 200,
      body: {
        token: 'valid_token'
      }
    });

    const request: any = {
      body: params
    };
    const response = makeResponseMock();
    await signInControllerMock.handle(request, response);

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith({
      token: 'valid_token'
    });
    expect(signInServiceMock.execute).toHaveBeenCalledWith(request.body);
    expect(signInServiceMock.execute).toHaveBeenCalledTimes(1);
  });
});
