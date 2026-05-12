import { ILoggerService } from '../../../configs/logger';
import {
  DeleteRecipeCriteria,
  IRecipeRepository
} from '../interfaces/recipe.interfaces';

export class DeleteRecipeService {
  protected recipeRepository: IRecipeRepository;
  protected logging: ILoggerService;

  constructor(params: {
    recipeRepository: IRecipeRepository;
    logging: ILoggerService;
  }) {
    this.recipeRepository = params.recipeRepository;
    this.logging = params.logging;
  }

  async execute(params: DeleteRecipeCriteria): Promise<{
    status: number;
    body: any;
  }> {
    try {
      const { id, id_user } = params;
      this.logging.info('Iniciando processo de exclusão de receita', {
        id,
        id_user
      });

      const recipe = await this.recipeRepository.find({ id, id_user });
      if (!recipe) {
        this.logging.info('Receita não encontrada para exclusão', {
          id,
          id_user
        });
        return { status: 404, body: { message: 'Receita não encontrada' } };
      }

      await this.recipeRepository.delete({ id, id_user });

      return { status: 200, body: { message: 'Receita deletada com sucesso' } };
    } catch (error: any) {
      this.logging.error('Erro ao excluir receita', { error });
      return {
        status: 500,
        body: { message: error.message }
      };
    }
  }
}
