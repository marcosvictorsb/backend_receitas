import { ILoggerService } from '../../../configs/logger';
import { IRecipeRepository, UpdateRecipeCriteria } from './recipe.interfaces';

export interface IUpdateRecipeService {
  execute(params: UpdateRecipeCriteria): Promise<{ status: number; body: any }>;
}

export interface UpdateRecipeControllerDependencies {
  service: IUpdateRecipeService;
}

export interface UpdateRecipeServiceDependencies {
  recipeRepository: IRecipeRepository;
  logging: ILoggerService;
}
