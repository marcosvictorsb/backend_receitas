import { ILoggerService } from '../../../configs/logger';
import { DeleteRecipeCriteria, IRecipeRepository } from './recipe.interfaces';

export interface IDeleteRecipeService {
  execute(params: DeleteRecipeCriteria): Promise<{
    status: number;
    body: any;
  }>;
}

export type DeleteRecipeControllerDependencies = {
  service: IDeleteRecipeService;
};

export interface DeleteRecipeServiceDependencies {
  recipeRepository: IRecipeRepository;
  logging: ILoggerService;
}
