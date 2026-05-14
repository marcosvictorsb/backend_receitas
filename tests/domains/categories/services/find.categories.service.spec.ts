import { beforeEach, describe, expect, it, vi } from 'vitest';
import { FindCategoriesService } from '../../../../src/domains/categories/services/find.categories.service';
import { LoggerMock } from '../../../mocks/logger.mock';

class CategoryRepositoryMock {
  findAll = vi.fn() as ReturnType<typeof vi.fn>;
}

const categoryRepositoryMock = new CategoryRepositoryMock();
const logging = new LoggerMock();
const findCategoriesServiceMock = new FindCategoriesService(
  categoryRepositoryMock,
  logging
);

describe('FindCategoriesService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return categories successfully', async () => {
    const mockCategories = [
      { id: 1, name: 'Category 1' },
      { id: 2, name: 'Category 2' }
    ];
    categoryRepositoryMock.findAll.mockResolvedValue(mockCategories);

    const result = await findCategoriesServiceMock.execute();

    expect(logging.info).toHaveBeenCalledWith('Buscando categorias');
    expect(categoryRepositoryMock.findAll).toHaveBeenCalled();
    expect(result).toEqual({
      status: 200,
      body: { categories: mockCategories }
    });
  });

  it('should handle errors when fetching categories', async () => {
    const mockError = new Error('Database error');
    categoryRepositoryMock.findAll.mockRejectedValue(mockError);

    const { status, body } = await findCategoriesServiceMock.execute();

    expect(status).toBe(500);
    expect(body.message).toBe('Erro ao buscar categorias');

    expect(logging.info).toHaveBeenCalledWith('Buscando categorias');
    expect(categoryRepositoryMock.findAll).toHaveBeenCalled();
    expect(logging.error).toHaveBeenCalledWith(
      'Erro ao buscar categorias',
      mockError
    );
  });
});
