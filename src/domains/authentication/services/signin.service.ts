import bcrypt from 'bcrypt';
import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import { IUserRepository } from '../../users/interfaces/user.interaces';
import {
  SignInServiceDependencies,
  SignInServiceParams
} from '../interfaces/signin.interfaces';
import { ILoggerService } from '../../../configs/logger';

export class SignInService {
  protected userRepository: IUserRepository;
  protected logging: ILoggerService;

  constructor(params: SignInServiceDependencies) {
    this.userRepository = params.userRepository;
    this.logging = params.logging;
  }

  async execute(params: SignInServiceParams): Promise<{
    status: number;
    body: {
      message?: string;
      token?: string;
      user?: {
        id: number;
        login: string;
        name: string;
      };
    };
  }> {
    try {
      const { login, password } = params;
      this.logging.info('Iniciando processo de login', { login });

      const user = await this.userRepository.find({ login });
      if (!user) {
        this.logging.info('Login não encontrado', { login });
        return { status: 400, body: { message: 'Login ou senha incorretos' } };
      }

      const isPasswordValid = await this.comparePassword(
        password,
        user.password
      );
      if (!isPasswordValid) {
        this.logging.info('Senha incorreta', { login });
        return { status: 400, body: { message: 'Login ou senha incorretos' } };
      }

      const token = this.generateToken({
        userId: user.id,
        login: user.login,
        name: user.name
      });

      return {
        status: 200,
        body: {
          user: { id: Number(user.id), login: user.login, name: user.name },
          token
        }
      };
    } catch (error: any) {
      this.logging.error('Erro ao realizar login', {
        error: JSON.stringify(error)
      });
      return { status: 500, body: { message: error.message } };
    }
  }

  private async comparePassword(plainPassword: string, hashedPassword: string) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  private generateToken(user: {
    userId?: number;
    login: string;
    name: string;
  }) {
    const secretKey: Secret = process.env.JWT_SECRET || 'default_secret';
    const expiresIn: SignOptions['expiresIn'] =
      (process.env.JWT_EXPIRES_IN as SignOptions['expiresIn']) || '24h';
    const { userId, login, name } = user;
    const token = jwt.sign({ userId, login, name }, secretKey, { expiresIn });
    this.logging.info('Token gerado com sucesso');
    return token;
  }
}
