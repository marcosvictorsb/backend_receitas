import { UpdateRecipeService } from '../../../../src/domains/recipes/services/update.recipe.service';
import { LoggerMock } from '../../../mocks/logger.mock';
import { RecipeRepositoryMock } from './recipe.repository.mock';

export const recipeRepositoryMock = new RecipeRepositoryMock();
export const loggingMock = new LoggerMock();
export const updateRecipeServiceMock = new UpdateRecipeService({
  recipeRepository: recipeRepositoryMock,
  logging: loggingMock
});
