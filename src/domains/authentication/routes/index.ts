import { Router, Request, Response } from 'express';
import { makeSignUpController } from '../factories/signup.factory';
import { validateBody } from '../../../configs/validate.schema.moddleware';
import { signUpBodySchema } from '../validators/signup.schema';

const router = Router();

const signUpController = makeSignUpController();

router.post(
  '/signup',
  validateBody(signUpBodySchema),
  (request: Request, response: Response) =>
    signUpController.handle(request, response)
);

export default router;
