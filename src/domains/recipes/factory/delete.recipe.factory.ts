import { logging } from '../../../configs/logger';
import { DeleteRecipeController } from '../controllers/delete.recipe.controller';
import RecipeModel from '../model/recipe.model';
import { RecipeRepository } from '../repository/recipe.repository';
import { DeleteRecipeService } from '../services/delete.recipe.service';

export const makeDeleteRecipeController = () => {
  const repository = new RecipeRepository({
    model: RecipeModel,
    logging
  });

  const deleteRecipeService = new DeleteRecipeService({
    recipeRepository: repository,
    logging
  });
  const deleteRecipeController = new DeleteRecipeController({
    service: deleteRecipeService
  });

  return deleteRecipeController;
};
