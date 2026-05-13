import { logging } from '../../configs/logger';
import { FindCategoriesController } from '../categories/controllers/find.categories.controller';
import CategoryModel from '../categories/model/category.model';
import { CategoryRepository } from '../categories/repository/category.repository';
import { FindCategoriesService } from '../categories/services/find.categories.service';

export const makeFindCategoryController = () => {
  const repository = new CategoryRepository(CategoryModel, logging);
  const service = new FindCategoriesService(repository, logging);
  const findCategoryController = new FindCategoriesController(service);
  return findCategoryController;
};
