import { FindRecipeCriteria } from './recipe.interfaces';

export interface IFindRecipeService {
  execute(params: FindRecipeCriteria): Promise<{ status: number; body: any }>;
}

export interface FindRecipeControllerDependencies {
  service: IFindRecipeService;
}
