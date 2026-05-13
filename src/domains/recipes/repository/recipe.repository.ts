import { ModelStatic, Op } from 'sequelize';
import { RecipeEntity } from '../entity/recipe.enity';
import RecipeModel from '../model/recipe.model';
import { ILoggerService } from '../../../configs/logger';
import {
  CreateRecipeCriteria,
  DeleteRecipeCriteria,
  FindAllRecipeResult,
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

  private serializeArray(value?: string[]): string | undefined {
    if (!value) return undefined;
    return JSON.stringify(value);
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

  async findAll(params: FindRecipeCriteria): Promise<FindAllRecipeResult> {
    this.logging.info('Buscando receitas');
    const offset = ((params.page || 1) - 1) * (params.limit || 10);
    const limit = params.limit || 10;

    const recipes = await this.model.findAndCountAll({
      where: {
        ...this.getConditions(params),
        ...(params.search
          ? {
              name: {
                [Op.iLike]: `%${params.search}%`
              }
            }
          : {})
      },
      include: [{ association: 'categorias', attributes: ['id', 'name'] }],
      limit,
      offset
    });

    if (recipes.count === 0) {
      this.logging.info('Nenhuma receita encontrada');
      return { recipes: [], total: 0 };
    }

    this.logging.info('Receitas encontradas', {
      count: recipes.count
    });
    return {
      recipes: recipes.rows.map((recipe) => new RecipeEntity(recipe)),
      total: recipes.count
    };
  }

  async create(params: CreateRecipeCriteria): Promise<RecipeEntity> {
    this.logging.info('Criando receita');
    const recipe = await this.model.create({
      ...params,
      preparation_method: this.serializeArray(params.preparation_method),
      ingredients: this.serializeArray(params.ingredients)
    });
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

  async update(
    data: Omit<UpdateRecipeCriteria, 'id' | 'id_user'>,
    params: { id: number; id_user: number }
  ): Promise<RecipeEntity> {
    this.logging.info('Atualizando receita');

    const payload = {
      ...data,
      preparation_method:
        data.preparation_method !== undefined
          ? this.serializeArray(data.preparation_method)
          : undefined,
      ingredients:
        data.ingredients !== undefined
          ? this.serializeArray(data.ingredients)
          : undefined
    };

    const [affectedRows] = await this.model.update(payload, {
      where: { id: params.id, id_user: params.id_user },
      returning: true
    });

    if (affectedRows === 0) {
      this.logging.info('Receita não encontrada para atualização', {
        id: params.id,
        id_user: params.id_user
      });
      throw new Error('Receita não encontrada');
    }

    const updatedRecipe = await this.model.findOne({
      where: { id: params.id, id_user: params.id_user },
      include: [{ association: 'categorias', attributes: ['id', 'name'] }]
    });

    if (!updatedRecipe) {
      throw new Error('Receita não encontrada');
    }

    return new RecipeEntity(updatedRecipe);
  }
}
