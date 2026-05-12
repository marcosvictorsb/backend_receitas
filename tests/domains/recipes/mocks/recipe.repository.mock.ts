import { vi } from 'vitest';

export class RecipeRepositoryMock {
  create = vi.fn() as ReturnType<typeof vi.fn>;
  findAll = vi.fn() as ReturnType<typeof vi.fn>;
  find = vi.fn() as ReturnType<typeof vi.fn>;
  delete = vi.fn() as ReturnType<typeof vi.fn>;
  update = vi.fn() as ReturnType<typeof vi.fn>;
}
