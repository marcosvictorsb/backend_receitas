import { Router, Request, Response } from 'express';
import { makeCreateRecipeController } from '../factory/create.recipe.factory';
import { validateBody } from '../../../configs/validate.schema.moddleware';
import { createRecipeBodySchema } from '../validators/create.recipe.schema';

const router = Router();

const createRecipeController = makeCreateRecipeController();

router.post(
  '/',
  validateBody(createRecipeBodySchema),
  (request: Request, response: Response) =>
    createRecipeController.handle(request, response)
);

export default router;
