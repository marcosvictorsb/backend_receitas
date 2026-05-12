import { vi } from 'vitest';
import { CreateRecipeService } from '../../../../src/domains/recipes/services/create.recipe.service';
import { LoggerMock } from '../../../mocks/logger.mock';

export class RecipeRepositoryMock {
  create = vi.fn() as ReturnType<typeof vi.fn>;
  findAll = vi.fn() as ReturnType<typeof vi.fn>;
  find = vi.fn() as ReturnType<typeof vi.fn>;
  delete = vi.fn() as ReturnType<typeof vi.fn>;
  update = vi.fn() as ReturnType<typeof vi.fn>;
}

export const recipeRepositoryMock = new RecipeRepositoryMock();
export const loggingMock = new LoggerMock();
export const createRecipeServiceMock = new CreateRecipeService({
  recipeRepository: recipeRepositoryMock,
  logging: loggingMock
});
