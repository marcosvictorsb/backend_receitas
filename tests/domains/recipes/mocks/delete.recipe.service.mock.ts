import { DeleteRecipeService } from '../../../../src/domains/recipes/services/delete.recipe.service';
import { LoggerMock } from '../../../mocks/logger.mock';
import { RecipeRepositoryMock } from './recipe.repository.mock';

export const recipeRepositoryMock = new RecipeRepositoryMock();
export const loggingMock = new LoggerMock();
export const deleteRecipeServiceMock = new DeleteRecipeService({
  recipeRepository: recipeRepositoryMock,
  logging: loggingMock
});
