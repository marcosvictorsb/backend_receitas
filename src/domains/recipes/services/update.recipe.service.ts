import { ILoggerService } from '../../../configs/logger';
import { IRecipeRepository } from '../interfaces/recipe.interfaces';
import { UpdateRecipeServiceDependencies } from '../interfaces/update.recipe.interface';

export class UpdateRecipeService {
  protected recipeRepository: IRecipeRepository;
  protected logging: ILoggerService;

  constructor(params: UpdateRecipeServiceDependencies) {
    this.recipeRepository = params.recipeRepository;
    this.logging = params.logging;
  }

  async execute(params: {
    id: number;
    id_user: number;
    id_category?: number;
    name?: string;
    preparation_time_minutes?: number;
    servings?: number;
    preparation_method?: string;
    ingredients?: string;
  }): Promise<{ status: number; body: any }> {
    try {
      const {
        id,
        id_user,
        id_category,
        name,
        preparation_time_minutes,
        servings,
        preparation_method,
        ingredients
      } = params;
      this.logging.info(
        `Iniciando processo de atualização da receita com id ${id}`
      );

      const existingRecipe = await this.recipeRepository.find({ id, id_user });
      if (!existingRecipe) {
        this.logging.info(
          `Receita com id ${id} não encontrada para atualização`
        );
        return { status: 404, body: { message: 'Recipe not found' } };
      }

      const updatedRecipe = await this.recipeRepository.update(
        {
          id_category,
          name,
          preparation_time_minutes,
          servings,
          preparation_method,
          ingredients
        },
        { id, id_user }
      );

      if (!updatedRecipe) {
        this.logging.warn(
          `Receita com id ${id} não encontrada para atualização`
        );
        return { status: 404, body: { message: 'Recipe not found' } };
      }

      return { status: 200, body: { recipe: updatedRecipe } };
    } catch (error: any) {
      this.logging.error(`Erro ao atualizar receita com id ${params.id}`, {
        error
      });
      return { status: 500, body: { message: error.message } };
    }
  }
}
