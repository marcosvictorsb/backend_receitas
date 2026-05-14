import { describe, it, expect, vi } from 'vitest';
import { LoggerMock } from '../../../mocks/logger.mock';
import { CategoryRepository } from '../../../../src/domains/categories/repository/category.repository';

class modelMock {
  findAll = vi.fn() as ReturnType<typeof vi.fn>;
}

const logging = new LoggerMock();
const model = new modelMock() as unknown as any;

const repository = new CategoryRepository(model, logging);

describe('CategoryRepository', () => {
  it('should find all categories', async () => {
    const categoryData = [
      {
        id: 'category_id',
        name: 'any_name'
      }
    ];
    model.findAll.mockResolvedValue(categoryData);

    const categories = await repository.findAll();

    expect(categories).toEqual([
      expect.objectContaining({
        id: 'category_id',
        name: 'any_name'
      })
    ]);
  });
});
