import { RecipeEntity } from '../entity/recipe.enity';

export type FindRecipeCriteria = {
  id?: number;
  id_user?: number;
  id_category?: number;
  name?: string;
};

export type CreateRecipeCriteria = {
  id_user: number;
  id_category?: number;
  name?: string;
  preparation_time_minutes: number;
  servings: number;
  preparation_method?: string;
  ingredients: string;
};

export type DeleteRecipeCriteria = {
  id: number;
};

export type UpdateRecipeCriteria = {
  id: number;
  id_user: number;
  id_category?: number;
  name?: string;
  preparation_time_minutes: number;
  servings?: number;
  preparation_method?: string;
  ingredients: string;
};

export interface IRecipeRepository {
  findAll(params: FindRecipeCriteria): Promise<RecipeEntity[]>;
  create(params: CreateRecipeCriteria): Promise<RecipeEntity>;
  delete(params: DeleteRecipeCriteria): Promise<boolean>;
  update(params: UpdateRecipeCriteria): Promise<RecipeEntity>;
}
