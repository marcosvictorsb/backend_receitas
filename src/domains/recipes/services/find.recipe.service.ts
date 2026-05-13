import { ILoggerService } from '../../../configs/logger';
import { IRecipeRepository } from '../interfaces/recipe.interfaces';

export class FindRecipeService {
  protected recipeRepository: IRecipeRepository;
  protected logging: ILoggerService;

  constructor(params: {
    recipeRepository: IRecipeRepository;
    logging: ILoggerService;
  }) {
    this.recipeRepository = params.recipeRepository;
    this.logging = params.logging;
  }

  async execute(params: {
    id?: number;
    id_user?: number;
    id_category?: number;
    name?: string;
  }): Promise<{ status: number; body: any }> {
    try {
      const { id, id_user, id_category, name } = params;
      this.logging.info('Iniciando processo de busca de receitas', {
        id,
        id_user,
        id_category,
        name
      });

      const recipes = await this.recipeRepository.findAll({
        id,
        id_user,
        id_category,
        name
      });

      return { status: 200, body: { recipes } };
    } catch (error: any) {
      this.logging.error('Erro ao buscar receitas', { error });
      return {
        status: 500,
        body: { message: 'Erro ao buscar receitas' }
      };
    }
  }
}
