import { Request, Response } from 'express';
import { SignUpParams, SignUpService } from '../interfaces/signup.interfaces';

export class SignUpController {
  protected service: SignUpService;

  constructor(params: SignUpParams) {
    this.service = params.service;
  }

  async handle(request: Request, response: Response) {
    const { name, login, password } = request.body;

    const { status, body } = await this.service.execute({
      name,
      login,
      password
    });

    return response.status(status).json(body);
  }
}
