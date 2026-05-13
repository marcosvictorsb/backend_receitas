import { ILoggerService } from '../../../configs/logger';
import { CreateRecipeServiceDependencies } from '../interfaces/create.recipe.interface';
import { IRecipeRepository } from '../interfaces/recipe.interfaces';

export class CreateRecipeService {
  protected recipeRepository: IRecipeRepository;
  protected logging: ILoggerService;

  constructor(params: CreateRecipeServiceDependencies) {
    this.recipeRepository = params.recipeRepository;
    this.logging = params.logging;
  }

  async execute(params: {
    id_user: number;
    id_category?: number;
    name?: string;
    preparation_time_minutes: number;
    servings: number;
    preparation_method?: string[];
    ingredients: string[];
  }): Promise<{ status: number; body: any }> {
    try {
      const {
        id_user,
        id_category,
        name,
        preparation_time_minutes,
        servings,
        preparation_method,
        ingredients
      } = params;
      this.logging.info('Iniciando processo de criação de receita');

      const newRecipe = await this.recipeRepository.create({
        id_user,
        id_category,
        name,
        preparation_time_minutes,
        servings,
        preparation_method,
        ingredients
      });

      return { status: 201, body: { recipe: newRecipe } };
    } catch (error: any) {
      this.logging.error('Erro ao criar receita', { error });
      return { status: 500, body: { message: error.message } };
    }
  }
}
