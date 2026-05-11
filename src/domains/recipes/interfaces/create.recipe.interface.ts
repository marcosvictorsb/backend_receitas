import { ILoggerService } from '../../../configs/logger';
import { CreateRecipeCriteria, IRecipeRepository } from './recipe.interfaces';

export interface ICreateRecipeService {
  execute(params: CreateRecipeCriteria): Promise<{ status: number; body: any }>;
}

export interface CreateRecipeControllerDependencies {
  service: ICreateRecipeService;
}

export interface CreateRecipeServiceDependencies {
  recipeRepository: IRecipeRepository;
  logging: ILoggerService;
}
