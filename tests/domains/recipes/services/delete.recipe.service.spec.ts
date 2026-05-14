import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  deleteRecipeServiceMock,
  loggingMock,
  recipeRepositoryMock
} from '../mocks/delete.recipe.service.mock';
import { DeleteRecipeCriteria } from '../../../../src/domains/recipes/interfaces/recipe.interfaces';

describe('DeleteRecipeService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should delete a recipe successfully', async () => {
    const params: DeleteRecipeCriteria = {
      id: 1,
      id_user: 1
    };
    const recipeData = {
      id: 1,
      name: 'Bolo de Chocolate',
      preparation_time_minutes: 30,
      servings: 8,
      preparation_method: 'Misture os ingredientes e asse a 180°C',
      ingredients: 'Chocolate, ovos, açúcar, farinha',
      id_category: 1
    };
    recipeRepositoryMock.find.mockResolvedValue(recipeData);

    const { status, body } = await deleteRecipeServiceMock.execute(params);

    expect(loggingMock.info).toHaveBeenCalledWith(
      'Iniciando processo de exclusão de receita',
      { id: params.id, id_user: params.id_user }
    );
    expect(recipeRepositoryMock.find).toHaveBeenCalledWith({
      id: params.id,
      id_user: params.id_user
    });
    expect(recipeRepositoryMock.delete).toHaveBeenCalledWith({
      id: params.id,
      id_user: params.id_user
    });

    expect(status).toBe(200);
    expect(body).toEqual({ message: 'Receita deletada com sucesso' });
  });

  it('should return 404 if recipe is not found', async () => {
    const params: DeleteRecipeCriteria = {
      id: 1,
      id_user: 1
    };
    recipeRepositoryMock.find.mockResolvedValue(undefined);

    const { status, body } = await deleteRecipeServiceMock.execute(params);

    expect(loggingMock.info).toHaveBeenCalledWith(
      'Iniciando processo de exclusão de receita',
      { id: params.id, id_user: params.id_user }
    );
    expect(loggingMock.info).toHaveBeenCalledWith(
      'Receita não encontrada para exclusão',
      { id: params.id, id_user: params.id_user }
    );
    expect(recipeRepositoryMock.find).toHaveBeenCalledWith({
      id: params.id,
      id_user: params.id_user
    });
    expect(recipeRepositoryMock.delete).not.toHaveBeenCalled();

    expect(status).toBe(404);
    expect(body).toEqual({ message: 'Receita não encontrada' });
  });

  it('should handle errors during recipe deletion', async () => {
    const params: DeleteRecipeCriteria = {
      id: 1,
      id_user: 1
    };
    const errorMessage = 'Erro ao excluir receita';
    recipeRepositoryMock.find.mockRejectedValue(new Error(errorMessage));

    const { status, body } = await deleteRecipeServiceMock.execute(params);

    expect(status).toBe(500);
    expect(body.message).toBe(errorMessage);
    expect(loggingMock.info).toHaveBeenCalledWith(
      'Iniciando processo de exclusão de receita',
      { id: params.id, id_user: params.id_user }
    );
    expect(loggingMock.error).toHaveBeenCalledWith('Erro ao excluir receita', {
      error: new Error(errorMessage)
    });
    expect(recipeRepositoryMock.delete).not.toBeCalled();
  });
});
