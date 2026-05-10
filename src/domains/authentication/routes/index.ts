import { Router, Request, Response } from 'express';
import { makeSignUpController } from '../factories/signup.factory';

const router = Router();

const signUpController = makeSignUpController();

router.post('/signup', (request: Request, response: Response) =>
  signUpController.handle(request, response)
);

export default router;
