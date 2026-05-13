import { ModelStatic } from 'sequelize';
import CategoryModel from '../model/category.model';
import { ILoggerService } from '../../../configs/logger';
import { ICategoryRepository } from '../interfaces/category.interfaces';
import { CategoryEntity } from '../entity/category.entity';

export class CategoryRepository implements ICategoryRepository {
  protected model: ModelStatic<CategoryModel>;
  protected logging: ILoggerService;

  constructor(model: ModelStatic<CategoryModel>, logging: ILoggerService) {
    this.model = model;
    this.logging = logging;
  }

  async findAll(): Promise<CategoryEntity[]> {
    this.logging.info('Buscando categorias');
    const categories = await this.model.findAll();

    this.logging.info(`${categories.length} categorias encontradas`);

    return categories.map(
      (category) =>
        new CategoryEntity({
          id: category.id as number,
          name: category.name as string
        })
    );
  }
}
