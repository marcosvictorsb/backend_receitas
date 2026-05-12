import { vi } from 'vitest';
import { CreateRecipeService } from '../../../../src/domains/recipes/services/create.recipe.service';
import { LoggerMock } from '../../../mocks/logger.mock';
import { RecipeRepositoryMock } from './recipe.repository.mock';

export const recipeRepositoryMock = new RecipeRepositoryMock();
export const loggingMock = new LoggerMock();
export const createRecipeServiceMock = new CreateRecipeService({
  recipeRepository: recipeRepositoryMock,
  logging: loggingMock
});
