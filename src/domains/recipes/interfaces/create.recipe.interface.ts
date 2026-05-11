import { ILoggerService } from '../../../configs/logger';
import { IRecipeRepository } from './recipe.interfaces';

export interface CreateRecipeServiceDependencies {
  recipeRepository: IRecipeRepository;
  logging: ILoggerService;
}
