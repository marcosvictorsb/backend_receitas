import { ModelStatic } from 'sequelize';
import UserModel from '../models/user.model';
import {
  CreateUserCriteria,
  FindUserCriteria,
  IUserRepository
} from '../interfaces/user.interaces';
import { UserEntity } from '../entity/user.entity';
import { ILoggerService } from '../../../configs/logger';

export class UserRepository implements IUserRepository {
  protected model: ModelStatic<UserModel>;
  protected logging: ILoggerService;

  constructor(params: {
    model: ModelStatic<UserModel>;
    logging: ILoggerService;
  }) {
    this.model = params.model;
    this.logging = params.logging;
  }

  async find(params: FindUserCriteria): Promise<UserEntity | undefined> {
    this.logging.info('Buscando usuário', { params });
    const user = await this.model.findOne({ where: params });
    return user ? new UserEntity(user) : undefined;
  }

  async create(params: CreateUserCriteria): Promise<UserEntity> {
    this.logging.info('Criando usuário', {
      params: { ...params, password: '****' }
    });
    const user = await this.model.create(params);
    return new UserEntity(user);
  }
}
