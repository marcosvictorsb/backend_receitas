import { ModelStatic } from 'sequelize';
import { RecipeEntity } from '../entity/recipe.enity';
import RecipeModel from '../model/recipe.model';
import { ILoggerService } from '../../../configs/logger';
import {
  CreateRecipeCriteria,
  DeleteRecipeCriteria,
  FindRecipeCriteria,
  IRecipeRepository,
  UpdateRecipeCriteria
} from '../interfaces/recipe.interfaces';

export class RecipeRepository implements IRecipeRepository {
  protected model: ModelStatic<RecipeModel>;
  protected logging: ILoggerService;

  constructor(params: {
    model: ModelStatic<RecipeModel>;
    logging: ILoggerService;
  }) {
    this.model = params.model;
    this.logging = params.logging;
  }

  private getConditions(params: FindRecipeCriteria) {
    const conditions: Record<string, unknown> = {};
    if (params.id) conditions.id = params.id;
    if (params.id_user) conditions.id_user = params.id_user;
    if (params.id_category) conditions.id_category = params.id_category;
    if (params.name) conditions.name = params.name;
    return conditions;
  }

  async find(params: FindRecipeCriteria): Promise<RecipeEntity | undefined> {
    this.logging.info('Buscando receita');
    const recipe = await this.model.findOne({
      where: this.getConditions(params)
    });
    if (!recipe) {
      this.logging.info('Receita não encontrada');
      return undefined;
    }
    this.logging.info('Receita encontrada');
    return new RecipeEntity(recipe);
  }

  async findAll(params: FindRecipeCriteria): Promise<RecipeEntity[]> {
    this.logging.info('Buscando receitas');
    const recipes = await this.model.findAll({
      where: this.getConditions(params)
    });

    if (!recipes.length) {
      this.logging.info('Nenhuma receita encontrada');
      return [];
    }

    this.logging.info('Receitas encontradas', {
      count: recipes.length
    });
    return recipes.map((recipe) => new RecipeEntity(recipe));
  }

  async create(params: CreateRecipeCriteria): Promise<RecipeEntity> {
    this.logging.info('Criando receita');
    const recipe = await this.model.create(params);
    return new RecipeEntity(recipe);
  }

  async delete(params: DeleteRecipeCriteria): Promise<boolean> {
    this.logging.info('Deletando receita');
    const affectedRows = await this.model.destroy({
      where: this.getConditions(params)
    });
    if (affectedRows === 0) {
      this.logging.info('Receita não encontrada para deleção', {
        id: params.id,
        id_user: params.id_user
      });
      return false;
    }
    this.logging.info('Receita deletada com sucesso', { id: params.id });
    return true;
  }

  async update(params: UpdateRecipeCriteria): Promise<RecipeEntity> {
    this.logging.info('Atualizando receita');
    const [affectedRows, [updatedRecipe]] = await this.model.update(params, {
      where: { id: params.id },
      returning: true
    });

    if (affectedRows === 0) {
      this.logging.info('Receita não encontrada para atualização', {
        id: params.id
      });
      throw new Error('Recipe not found');
    }

    return new RecipeEntity(updatedRecipe);
  }
}
