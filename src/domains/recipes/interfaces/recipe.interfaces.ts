import { RecipeEntity } from '../entity/recipe.enity';

export type FindRecipeCriteria = {
  id?: number;
  id_user?: number;
  id_category?: number;
  name?: string;
  page?: number;
  limit?: number;
  search?: string;
};

export type CreateRecipeCriteria = {
  id_user: number;
  id_category?: number;
  name?: string;
  preparation_time_minutes: number;
  servings: number;
  preparation_method?: string[];
  ingredients: string[];
};

export type DeleteRecipeCriteria = {
  id: number;
  id_user: number;
};

export type UpdateRecipeCriteria = {
  id: number;
  id_user: number;
  id_category?: number;
  name?: string;
  preparation_time_minutes?: number;
  servings?: number;
  preparation_method?: string[];
  ingredients?: string[];
};

export type FindAllRecipeResult = {
  recipes: RecipeEntity[];
  total: number;
};

export interface IRecipeRepository {
  find(params: FindRecipeCriteria): Promise<RecipeEntity | undefined>;
  findAll(params: FindRecipeCriteria): Promise<FindAllRecipeResult>;
  create(params: CreateRecipeCriteria): Promise<RecipeEntity>;
  delete(params: DeleteRecipeCriteria): Promise<boolean>;
  update(
    data: Omit<UpdateRecipeCriteria, 'id' | 'id_user'>,
    criteria: { id: number; id_user: number }
  ): Promise<RecipeEntity>;
}
