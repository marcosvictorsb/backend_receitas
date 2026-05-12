import { beforeEach, vi, describe, it, expect } from 'vitest';
import { DeleteRecipeController } from '../../../../src/domains/recipes/controllers/delete.recipe.controller';
import { makeResponseMock } from '../../../mocks/response.mock';

class DeleteRecipeServiceMock {
  execute = vi.fn() as ReturnType<typeof vi.fn>;
}

const deleteRecipeServiceMock = new DeleteRecipeServiceMock();

export const deleteRecipeController = new DeleteRecipeController({
  service: deleteRecipeServiceMock
});

describe('DeleteRecipeController', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should delete a recipe successfully', async () => {
    const params = { id: '1' };

    deleteRecipeServiceMock.execute.mockResolvedValue({
      status: 200,
      body: {
        message: 'Receita deletada com sucesso'
      }
    });

    const request: any = {
      params,
      user: {
        id: 22
      }
    };
    const response = makeResponseMock();

    await deleteRecipeController.handle(request, response);

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith({
      message: 'Receita deletada com sucesso'
    });
    expect(deleteRecipeServiceMock.execute).toHaveBeenCalledWith({
      id_user: Number(request.user.id),
      id: Number(params.id)
    });
    expect(deleteRecipeServiceMock.execute).toHaveBeenCalledTimes(1);
  });
});
