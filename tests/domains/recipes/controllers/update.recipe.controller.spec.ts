import { beforeEach, describe, expect, it, vi } from 'vitest';
import { UpdateRecipeController } from '../../../../src/domains/recipes/controllers/update.recipe.controller';

class UpdateRecipeServiceMock {
  execute = vi.fn() as ReturnType<typeof vi.fn>;
}
const service = new UpdateRecipeServiceMock();

const updateRecipeController = new UpdateRecipeController({
  service
});

describe('UpdateRecipeController', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should update a recipe successfully', async () => {
    const mockRequest = {
      params: { id: '1' },
      body: {
        id_category: 2,
        name: 'Updated Recipe',
        preparation_time_minutes: 30,
        servings: 4,
        preparation_method: 'Updated method',
        ingredients: ['Ingredient 1', 'Ingredient 2']
      },
      user: { id: '1' }
    } as any;

    const mockResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    } as any;

    const mockServiceResponse = {
      status: 200,
      body: { message: 'Recipe updated successfully' }
    };

    service.execute.mockResolvedValue(mockServiceResponse);

    await updateRecipeController.handle(mockRequest, mockResponse);

    expect(service.execute).toHaveBeenCalledWith({
      id_category: 2,
      name: 'Updated Recipe',
      preparation_time_minutes: 30,
      servings: 4,
      preparation_method: 'Updated method',
      ingredients: ['Ingredient 1', 'Ingredient 2'],
      id: 1,
      id_user: 1
    });
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Recipe updated successfully'
    });
  });
});
