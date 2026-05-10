import { UserEntity } from '../entity/user.entity';

export type FindUserCriteria = {
  login: string;
  name?: string;
};

export type CreateUserCriteria = {
  name: string;
  login: string;
  password: string;
};

export interface IUserRepository {
  find(params: FindUserCriteria): Promise<UserEntity | undefined>;
  create(params: CreateUserCriteria): Promise<UserEntity>;
}
