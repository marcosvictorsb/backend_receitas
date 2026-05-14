import { beforeEach, describe, expect, it, vi } from 'vitest';
import { FindCategoriesController } from '../../../../src/domains/categories/controllers/find.categories.controller';

class FindCategoriesServiceMock {
  execute = vi.fn() as ReturnType<typeof vi.fn>;
}

const serviceMock = new FindCategoriesServiceMock();

export const findCategoriesController = new FindCategoriesController(
  serviceMock
);

describe('FindCategoriesController', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should find all categories', async () => {
    const categories = [
      { id: 1, name: 'Category 1' },
      { id: 2, name: 'Category 2' }
    ];

    serviceMock.execute.mockResolvedValue({
      status: 200,
      body: { categories }
    });

    const request: any = {};
    const response: any = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    await findCategoriesController.handle(request, response);

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith({ categories });
    expect(serviceMock.execute).toHaveBeenCalled();
  });
});
