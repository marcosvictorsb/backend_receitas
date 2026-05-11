import { logging } from '../../../configs/logger';
import { FindRecipeController } from '../controllers/find.recipe.controller';
import RecipeModel from '../model/recipe.model';
import { RecipeRepository } from '../repository/recipe.repository';
import { FindRecipeService } from '../services/find.recipe.service';

export const makeFindRecipeController = () => {
  const repository = new RecipeRepository({
    model: RecipeModel,
    logging
  });

  const findRecipeService = new FindRecipeService({
    recipeRepository: repository,
    logging
  });

  const findRecipeController = new FindRecipeController({
    service: findRecipeService
  });

  return findRecipeController;
};
