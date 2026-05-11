import { logging } from '../../../configs/logger';
import { CreateRecipeController } from '../controllers/create.receipe.controller';
import RecipeModel from '../model/recipe.model';
import { RecipeRepository } from '../repository/recipe.repository';
import { CreateRecipeService } from '../services/create.recipe.service';

export const makeCreateRecipeController = () => {
  const recipeRepository = new RecipeRepository({
    model: RecipeModel,
    logging
  });
  const createRecipeService = new CreateRecipeService({
    recipeRepository,
    logging
  });
  const createRecipeController = new CreateRecipeController({
    service: createRecipeService
  });

  return createRecipeController;
};
