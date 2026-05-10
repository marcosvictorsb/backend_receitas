import { ILoggerService } from '../../../configs/logger';
import { UserEntity } from '../../users/entity/user.entity';
import { IUserRepository } from '../../users/interfaces/user.interaces';
import {
  SignUpServiceDependencies,
  SignUpServiceParams
} from '../interfaces/signup.interfaces';
import bcrypt from 'bcrypt';

export class SignUpService {
  protected userRepository: IUserRepository;
  protected logging: ILoggerService;

  constructor(params: SignUpServiceDependencies) {
    this.userRepository = params.repository;
    this.logging = params.logging;
  }

  async execute(params: SignUpServiceParams): Promise<{
    status: number;
    body: { message?: string; user?: UserEntity };
  }> {
    try {
      const { name, login, password } = params;
      this.logging.info('Iniciando processo de cadastro', { name, login });

      const user = await this.userRepository.find({ login });
      if (user) {
        this.logging.error('Login já existe', { login });
        return { status: 400, body: { message: 'Login já existe' } };
      }

      const hashedPassword = await this.hashPassword(password);

      const newUser = await this.userRepository.create({
        name,
        login,
        password: hashedPassword
      });

      return { status: 201, body: { user: newUser } };
    } catch (error: any) {
      console.log(error);
      this.logging.error('Erro ao cadastrar usuário', { error });
      return { status: 400, body: { message: error.message } };
    }
  }

  private async hashPassword(password: string) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }
}
