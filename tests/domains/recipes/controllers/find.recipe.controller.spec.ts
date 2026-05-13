import { beforeEach, describe, expect, it, vi } from 'vitest';
import { FindRecipeController } from '../../../../src/domains/recipes/controllers/find.recipe.controller';
import { makeResponseMock } from '../../../mocks/response.mock';

class FindRecipeServiceMock {
  execute = vi.fn() as ReturnType<typeof vi.fn>;
}

const serviceMock = new FindRecipeServiceMock();

const findRecipeController = new FindRecipeController({
  service: serviceMock
});

describe('FindRecipeController', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should find a recipe by id', async () => {
    const recipe = {
      id: 1,
      id_user: 1,
      id_category: 1,
      name: 'Recipe Name'
    };

    serviceMock.execute.mockResolvedValue({
      status: 200,
      body: {
        recipe
      }
    });

    const request: any = {
      query: {
        id: 1,
        id_category: 3,
        name: 'bolo de chocolate'
      },
      user: {
        id: 2
      }
    };
    const response = makeResponseMock();

    await findRecipeController.handle(request, response);

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith({
      recipe
    });
    expect(serviceMock.execute).toHaveBeenCalledWith({
      id: request.query.id,
      id_user: request.user.id,
      id_category: request.query.id_category,
      name: request.query.name,
      page: 1,
      limit: 10,
      search: undefined
    });
    expect(serviceMock.execute).toHaveBeenCalledTimes(1);
  });

  it('should return 404 if recipe is not found', async () => {
    serviceMock.execute.mockResolvedValue({
      status: 404,
      body: {
        message: 'Recipe not found'
      }
    });

    const request: any = {
      query: {
        id: undefined,
        id_category: undefined,
        name: undefined
      },
      user: {
        id: 1
      }
    };
    const response = makeResponseMock();

    await findRecipeController.handle(request, response);

    expect(response.status).toHaveBeenCalledWith(404);
    expect(response.json).toHaveBeenCalledWith({
      message: 'Recipe not found'
    });
    expect(serviceMock.execute).toHaveBeenCalledWith({
      id: undefined,
      id_user: request.user.id,
      id_category: undefined,
      name: undefined,
      page: 1,
      limit: 10,
      search: undefined
    });
    expect(serviceMock.execute).toHaveBeenCalledTimes(1);
  });
});
