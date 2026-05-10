import { Request, Response } from 'express';
import { SignInParams, SignInService } from '../interfaces/signin.interfaces';

export class SignInController {
  protected service: SignInService;

  constructor(params: SignInParams) {
    this.service = params.service;
  }

  async handle(request: Request, response: Response) {
    const { login, password } = request.body;

    const { status, body } = await this.service.execute({
      login,
      password
    });

    return response.status(status).json(body);
  }
}
