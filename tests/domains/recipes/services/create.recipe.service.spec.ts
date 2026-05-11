import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  createRecipeServiceMock,
  loggingMock,
  recipeRepositoryMock
} from '../mocks/create.service.mock';

describe('CreateRecipeService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create a new recipe successfully', async () => {
    const params = {
      id_user: 1,
      id_category: 2,
      name: 'Test Recipe',
      preparation_time_minutes: 30,
      servings: 4,
      preparation_method: 'Test method',
      ingredients: 'Test ingredients'
    };
    const createdRecipe = { id: 1, ...params };
    recipeRepositoryMock.create.mockResolvedValue(createdRecipe);

    const { status, body } = await createRecipeServiceMock.execute(params);

    expect(status).toBe(201);
    expect(body.recipe).toEqual(createdRecipe);
    expect(loggingMock.info).toHaveBeenCalledWith(
      'Iniciando processo de criação de receita'
    );
    expect(recipeRepositoryMock.create).toHaveBeenCalledWith(params);
    expect(recipeRepositoryMock.create).toHaveBeenCalledTimes(1);
    expect(loggingMock.error).not.toHaveBeenCalled();
  });

  it('should handle errors during recipe creation', async () => {
    const params = {
      id_user: 1,
      id_category: 2,
      name: 'Test Recipe',
      preparation_time_minutes: 30,
      servings: 4,
      preparation_method: 'Test method',
      ingredients: 'Test ingredients'
    };
    const errorMessage = 'Database error';
    recipeRepositoryMock.create.mockRejectedValue(new Error(errorMessage));

    const { status, body } = await createRecipeServiceMock.execute(params);

    expect(status).toBe(500);
    expect(body.message).toBe(errorMessage);
    expect(loggingMock.info).toHaveBeenCalledWith(
      'Iniciando processo de criação de receita'
    );
    expect(recipeRepositoryMock.create).toHaveBeenCalledWith(params);
    expect(recipeRepositoryMock.create).toHaveBeenCalledTimes(1);
    expect(loggingMock.error).toHaveBeenCalledWith('Erro ao criar receita', {
      error: new Error(errorMessage)
    });
  });
});
