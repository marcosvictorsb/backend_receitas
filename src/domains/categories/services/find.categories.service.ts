import { ILoggerService } from '../../../configs/logger';
import { ICategoryRepository } from '../interfaces/category.interfaces';

export class FindCategoriesService {
  constructor(
    private readonly categoryRepository: ICategoryRepository,
    private readonly logging: ILoggerService
  ) {}

  async execute(): Promise<{ status: number; body: any }> {
    try {
      this.logging.info('Buscando categorias');
      const categories = await this.categoryRepository.findAll();
      return { status: 200, body: { categories } };
    } catch (error) {
      this.logging.error('Erro ao buscar categorias', error);
      throw new Error('Erro ao buscar categorias');
    }
  }
}
