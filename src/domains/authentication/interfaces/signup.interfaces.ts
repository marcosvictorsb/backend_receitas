import { ILoggerService } from '../../../configs/logger';
import { IUserRepository } from '../../users/interfaces/user.interaces';

export interface SignUpServiceDependencies {
  repository: IUserRepository;
  logging: ILoggerService;
}

export type SignUpServiceParams = {
  name: string;
  login: string;
  password: string;
};

export interface SignUpService {
  execute(params: SignUpServiceParams): Promise<{ status: number; body: any }>;
}

export type SignUpParams = {
  service: SignUpService;
};
