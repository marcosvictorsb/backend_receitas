import { Router, Request, Response } from 'express';
import { makeCreateRecipeController } from '../factory/create.recipe.factory';
import { validateBody } from '../../../configs/validate.schema.moddleware';
import { createRecipeBodySchema } from '../validators/create.recipe.schema';
import { makeFindRecipeController } from '../factory/find.recipe.factory';
import { authMiddleware } from '../../../middlewares/auth.jwt.middleware';

const router = Router();

const createRecipeController = makeCreateRecipeController();

router.post(
  '/',
  authMiddleware,
  validateBody(createRecipeBodySchema),
  (request: Request, response: Response) =>
    createRecipeController.handle(request, response)
);

const findRecipeController = makeFindRecipeController();

router.get('/', (request: Request, response: Response) =>
  findRecipeController.handle(request, response)
);

export default router;
