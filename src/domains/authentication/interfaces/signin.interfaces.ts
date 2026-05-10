import { ILoggerService } from '../../../configs/logger';
import { IUserRepository } from '../../users/interfaces/user.interaces';

export interface SignInServiceDependencies {
  userRepository: IUserRepository;
  logging: ILoggerService;
}

export type SignInServiceParams = {
  login: string;
  password: string;
};

export interface SignInService {
  execute(params: SignInServiceParams): Promise<{ status: number; body: any }>;
}

export type SignInParams = {
  service: SignInService;
};
