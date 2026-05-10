import { logging } from '../../../configs/logger';
import UserModel from '../../users/models/user.model';
import { UserRepository } from '../../users/repository/user.repository';
import { SignInController } from '../controllers/signin.controller';
import { SignInService } from '../services/signin.service';

export const makeSignInController = () => {
  const userRepository = new UserRepository({ model: UserModel, logging });
  const signInService = new SignInService({
    userRepository,
    logging
  });

  const signInController = new SignInController({ service: signInService });

  return signInController;
};
