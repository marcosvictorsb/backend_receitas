import { logging } from '../../../configs/logger';
import UserModel from '../../users/models/user.model';
import { UserRepository } from '../../users/repository/user.repository';
import { SignUpController } from '../controllers/signup.controller';
import { SignUpService } from '../services/signup.service';

export const makeSignUpController = () => {
  const userRepository = new UserRepository({ model: UserModel, logging });
  const signUpService = new SignUpService({
    repository: userRepository,
    logging
  });
  const signUpController = new SignUpController({ service: signUpService });

  return signUpController;
};
