import { logging } from '../../../configs/logger';
import { UpdateRecipeController } from '../controllers/update.recipe.controller';
import RecipeModel from '../model/recipe.model';
import { RecipeRepository } from '../repository/recipe.repository';
import { UpdateRecipeService } from '../services/update.recipe.service';

export const makeUpdateRecipeController = () => {
  const repository = new RecipeRepository({
    model: RecipeModel,
    logging
  });

  const updateRecipeService = new UpdateRecipeService({
    recipeRepository: repository,
    logging
  });

  const updateRecipeController = new UpdateRecipeController({
    service: updateRecipeService
  });

  return updateRecipeController;
};
