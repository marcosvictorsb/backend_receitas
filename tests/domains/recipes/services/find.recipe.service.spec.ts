import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  findRecipeServiceMock,
  loggingMock,
  recipeRepositoryMock
} from '../mocks/find.recipe.service.mock';

describe('FindRecipeService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should find recipes by criteria successfully', async () => {
    const params = { name: 'any_name' };
    const recipeData = [
      {
        id: 1,
        id_user: 2,
        id_category: 3,
        name: params.name
      }
    ];
    recipeRepositoryMock.findAll.mockResolvedValue(recipeData);

    const { status, body } = await findRecipeServiceMock.execute(params);

    expect(status).toBe(200);
    expect(body.recipes).toEqual([
      {
        id: 1,
        id_user: 2,
        id_category: 3,
        name: params.name
      }
    ]);
    expect(loggingMock.info).toHaveBeenCalledWith(
      'Iniciando processo de busca de receitas',
      {
        id: undefined,
        id_user: undefined,
        id_category: undefined,
        name: params.name
      }
    );
    expect(recipeRepositoryMock.findAll).toHaveBeenCalledWith(params);
  });

  it('should handle errors during recipe search', async () => {
    const params = { name: 'any_name' };
    const errorMessage = 'Database error';
    recipeRepositoryMock.findAll.mockRejectedValue(new Error(errorMessage));

    const { status, body } = await findRecipeServiceMock.execute(params);

    expect(status).toBe(500);
    expect(body.message).toBe(errorMessage);
    expect(loggingMock.info).toHaveBeenCalledWith(
      'Iniciando processo de busca de receitas',
      {
        id: undefined,
        id_user: undefined,
        id_category: undefined,
        name: params.name
      }
    );
    expect(recipeRepositoryMock.findAll).toHaveBeenCalledWith(params);
    expect(loggingMock.error).toHaveBeenCalledWith('Erro ao buscar receitas', {
      error: new Error(errorMessage)
    });
  });
});
