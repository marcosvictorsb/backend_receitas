import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  loggingMock,
  recipeRepositoryMock,
  updateRecipeServiceMock
} from '../mocks/update.recipe.service.mock';

describe('UpdateRecipeService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should update a recipe successfully', async () => {
    const params = {
      id: 1,
      id_user: 2,
      id_category: 3,
      name: 'Updated Recipe Name',
      preparation_time_minutes: 45,
      servings: 4,
      preparation_method: ['Updated preparation method'],
      ingredients: ['Updated ingredients']
    };
    const updatedRecipe = {
      id: 1,
      id_user: 2,
      id_category: 3,
      name: 'Updated Recipe Name',
      preparation_time_minutes: 45,
      servings: 4,
      preparation_method: ['Updated preparation method'],
      ingredients: ['Updated ingredients'],
      created_at: new Date(),
      updated_at: new Date(),
      name_category: undefined
    };
    recipeRepositoryMock.find.mockResolvedValue({
      id: params.id,
      id_user: params.id_user
    });
    recipeRepositoryMock.update.mockResolvedValue(updatedRecipe);

    const { status, body } = await updateRecipeServiceMock.execute(params);

    expect(loggingMock.info).toHaveBeenCalledWith(
      `Iniciando processo de atualização da receita com id ${params.id}`
    );
    expect(recipeRepositoryMock.find).toHaveBeenCalledWith({
      id: params.id,
      id_user: params.id_user
    });
    expect(recipeRepositoryMock.update).toHaveBeenCalledWith(
      {
        id_category: params.id_category,
        name: params.name,
        preparation_time_minutes: params.preparation_time_minutes,
        servings: params.servings,
        preparation_method: params.preparation_method,
        ingredients: params.ingredients
      },
      { id: params.id, id_user: params.id_user }
    );
    expect(loggingMock.error).not.toHaveBeenCalled();
    expect(status).toBe(200);
    expect(body).toEqual({ recipe: updatedRecipe });
  });

  it('should return 404 if recipe not found', async () => {
    const params = {
      id: 1,
      id_user: 2
    };
    recipeRepositoryMock.find.mockResolvedValue(undefined);

    const { status, body } = await updateRecipeServiceMock.execute(params);

    expect(loggingMock.info).toHaveBeenCalledWith(
      `Iniciando processo de atualização da receita com id ${params.id}`
    );
    expect(recipeRepositoryMock.find).toHaveBeenCalledWith({
      id: params.id,
      id_user: params.id_user
    });
    expect(recipeRepositoryMock.update).not.toHaveBeenCalled();
    expect(loggingMock.info).toHaveBeenCalledWith(
      `Receita com id ${params.id} não encontrada para atualização`
    );
    expect(status).toBe(404);
    expect(body).toEqual({ message: 'Recipe not found' });
  });

  it('should error if update fails', async () => {
    const params = {
      id: 1,
      id_user: 2,
      name: 'Updated Recipe Name',
      preparation_method: ['Updated method'],
      ingredients: ['Updated ingredients']
    };
    const error = new Error('Database error');
    recipeRepositoryMock.find.mockResolvedValue({
      id: params.id,
      id_user: params.id_user
    });
    recipeRepositoryMock.update.mockRejectedValue(error);

    const { status, body } = await updateRecipeServiceMock.execute(params);

    expect(loggingMock.info).toHaveBeenCalledWith(
      `Iniciando processo de atualização da receita com id ${params.id}`
    );
    expect(recipeRepositoryMock.find).toHaveBeenCalledWith({
      id: params.id,
      id_user: params.id_user
    });
    expect(recipeRepositoryMock.update).toHaveBeenCalledWith(
      {
        id_category: undefined,
        name: params.name,
        preparation_time_minutes: undefined,
        servings: undefined,
        preparation_method: params.preparation_method,
        ingredients: params.ingredients
      },
      { id: params.id, id_user: params.id_user }
    );
    expect(loggingMock.error).toHaveBeenCalledWith(
      `Erro ao atualizar receita com id ${params.id}`,
      { error }
    );
    expect(status).toBe(500);
    expect(body).toEqual({ message: error.message });
  });
});
