import { FindRecipeService } from '../../../../src/domains/recipes/services/find.recipe.service';
import { LoggerMock } from '../../../mocks/logger.mock';
import { RecipeRepositoryMock } from './recipe.repository.mock';

export const recipeRepositoryMock = new RecipeRepositoryMock();
export const loggingMock = new LoggerMock();
export const findRecipeServiceMock = new FindRecipeService({
  recipeRepository: recipeRepositoryMock,
  logging: loggingMock
});
