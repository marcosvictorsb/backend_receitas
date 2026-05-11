import { beforeEach, vi, describe, it, expect } from 'vitest';
import { CreateRecipeController } from '../../../../src/domains/recipes/controllers/create.recipe.controller';
import { makeResponseMock } from '../../../mocks/response.mock';

class CreateRecipeServiceMock {
  execute = vi.fn() as ReturnType<typeof vi.fn>;
}

const serviceMock = new CreateRecipeServiceMock();

export const createRecipeController = new CreateRecipeController({
  service: serviceMock
});

describe('CreateRecipeController', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create a new recipe', async () => {
    const params = {
      id_user: 'user_id',
      id_category: 'category_id',
      name: 'Recipe Name',
      preparation_time_minutes: 30,
      servings: 4,
      preparation_method: 'Preparation method description',
      ingredients: 'Ingredient 1, Ingredient 2'
    };

    serviceMock.execute.mockResolvedValue({
      status: 201,
      body: {
        recipe: {
          id: 'new_recipe_id',
          ...params
        }
      }
    });

    const request: any = {
      body: params
    };
    const response = makeResponseMock();

    await createRecipeController.handle(request, response);

    expect(response.status).toHaveBeenCalledWith(201);
    expect(response.json).toHaveBeenCalledWith({
      recipe: {
        id: 'new_recipe_id',
        ...params
      }
    });
    expect(serviceMock.execute).toHaveBeenCalledWith(params);
    expect(serviceMock.execute).toHaveBeenCalledTimes(1);
  });
});
