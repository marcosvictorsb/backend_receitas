import { CategoryEntity } from '../entity/category.entity';

export type FindCategoryCriteria = {
  id?: number;
  name?: string;
};

export interface IFindCategoriesService {
  execute(): Promise<{ status: number; body: any }>;
}

export interface FindCategoryControllerDependencies {
  service: IFindCategoriesService;
}

export interface ICategoryRepository {
  findAll(): Promise<CategoryEntity[]>;
}
