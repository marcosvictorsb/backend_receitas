import { ModelStatic } from 'sequelize';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { LoggerMock } from '../../../mocks/logger.mock';
import { RecipeRepository } from '../../../../src/domains/recipes/repository/recipe.repository';

const modelMock = {
  findAndCountAll: vi.fn(),
  findOne: vi.fn(),
  create: vi.fn(),
  destroy: vi.fn(),
  update: vi.fn()
};

const model = modelMock as unknown as ModelStatic<any>;
const logging = new LoggerMock();

export const recipeRepositoryMock = new RecipeRepository({
  model,
  logging
});

describe('RecipeRepository', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('findAndCountAll', () => {
    it('should find recipes by criteria', async () => {
      const params = { name: 'any_name' };
      const recipeData = [
        {
          id: 'recipe_id',
          id_user: 'user_id',
          id_category: 'category_id',
          name: params.name,
          preparation_method: '["Passo 1", "Passo 2"]',
          ingredients: '["Ingrediente 1", "Ingrediente 2"]',
          categorias: {
            name: 'any_category'
          }
        }
      ];
      modelMock.findAndCountAll.mockResolvedValue({
        rows: recipeData,
        count: recipeData.length
      });

      const { recipes } = await recipeRepositoryMock.findAll(params);

      expect(recipes).toEqual([
        expect.objectContaining({
          id: 'recipe_id',
          id_user: 'user_id',
          id_category: 'category_id',
          name: params.name,
          name_category: 'any_category',
          ingredients: ['Ingrediente 1', 'Ingrediente 2'],
          preparation_method: ['Passo 1', 'Passo 2'],
          created_at: undefined,
          updated_at: undefined,
          servings: undefined,
          preparation_time_minutes: undefined
        })
      ]);
      expect(logging.info).toHaveBeenCalledWith('Buscando receitas');
      expect(modelMock.findAndCountAll).toHaveBeenCalledWith({
        where: { name: params.name },
        order: [['created_at', 'DESC']],
        include: [{ association: 'categorias', attributes: ['id', 'name'] }],
        limit: 10,
        offset: 0
      });
      expect(modelMock.findAndCountAll).toHaveBeenCalledTimes(1);
    });

    it('should return empty array if no recipes found', async () => {
      const params = { name: 'nonexistent_name' };
      modelMock.findAndCountAll.mockResolvedValue({ rows: [], count: 0 });

      const recipes = await recipeRepositoryMock.findAll(params);

      expect(recipes).toEqual({ recipes: [], total: 0 });
      expect(logging.info).toHaveBeenCalledWith('Buscando receitas');
      expect(logging.info).toHaveBeenCalledWith('Nenhuma receita encontrada');
      expect(modelMock.findAndCountAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should create a new recipe', async () => {
      const params = {
        id_user: 1,
        id_category: 5,
        name: 'any_name',
        preparation_time_minutes: 30,
        servings: 4,
        preparation_method: ['any_method'],
        ingredients: ['any_ingredients']
      };
      const recipeData = {
        ...params,
        preparation_method: '["any_method"]',
        ingredients: '["any_ingredients"]'
      };
      modelMock.create.mockResolvedValue(recipeData);

      const recipe = await recipeRepositoryMock.create(params);

      expect(recipe).toEqual({
        id: undefined,
        id_user: 1,
        id_category: 5,
        name: 'any_name',
        preparation_time_minutes: 30,
        servings: 4,
        preparation_method: ['any_method'],
        ingredients: ['any_ingredients'],
        created_at: undefined,
        updated_at: undefined,
        name_category: undefined
      });
      expect(logging.info).toHaveBeenCalledWith('Criando receita');
      expect(modelMock.create).toHaveBeenCalledWith({
        id_user: 1,
        id_category: 5,
        name: 'any_name',
        preparation_time_minutes: 30,
        servings: 4,
        preparation_method: '["any_method"]',
        ingredients: '["any_ingredients"]'
      });
      expect(modelMock.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('delete', () => {
    it('should delete a recipe by id', async () => {
      const params = { id: 1, id_user: 1 };
      modelMock.destroy.mockResolvedValue(1);

      const result = await recipeRepositoryMock.delete(params);

      expect(result).toBe(true);
      expect(logging.info).toHaveBeenCalledWith('Deletando receita');
      expect(modelMock.destroy).toHaveBeenCalledWith({
        where: { id: params.id, id_user: params.id_user }
      });
      expect(modelMock.destroy).toHaveBeenCalledTimes(1);
    });

    it('should return false if recipe not found for deletion', async () => {
      const params = { id: 999, id_user: 1 };
      modelMock.destroy.mockResolvedValue(0);

      const result = await recipeRepositoryMock.delete(params);

      expect(result).toBe(false);
      expect(logging.info).toHaveBeenCalledWith('Deletando receita');
      expect(logging.info).toHaveBeenCalledWith(
        'Receita não encontrada para deleção',
        {
          id: params.id,
          id_user: params.id_user
        }
      );
      expect(modelMock.destroy).toHaveBeenCalledWith({
        where: { id: params.id, id_user: params.id_user }
      });
      expect(modelMock.destroy).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update a recipe by id', async () => {
      const params = {
        id: 1,
        id_user: 1,
        id_category: 5,
        name: 'updated_name',
        preparation_time_minutes: 45,
        servings: 6,
        preparation_method: ['updated_method'],
        ingredients: ['updated_ingredients']
      };
      const updatedRecipeData = {
        id: 1,
        id_user: 1,
        id_category: 5,
        name: 'updated_name',
        preparation_time_minutes: 45,
        servings: 6,
        preparation_method: '["updated_method"]',
        ingredients: '["updated_ingredients"]'
      };
      modelMock.update.mockResolvedValue([1, [updatedRecipeData]]);
      modelMock.findOne.mockResolvedValue(updatedRecipeData);

      const recipe = await recipeRepositoryMock.update(
        {
          id_category: params.id_category,
          name: params.name,
          preparation_time_minutes: params.preparation_time_minutes,
          servings: params.servings,
          preparation_method: params.preparation_method,
          ingredients: params.ingredients
        },
        { id: params.id, id_user: params.id_user }
      );

      expect(recipe).toEqual({
        id: 1,
        id_user: 1,
        id_category: 5,
        name: 'updated_name',
        preparation_time_minutes: 45,
        servings: 6,
        preparation_method: ['updated_method'],
        ingredients: ['updated_ingredients'],
        created_at: undefined,
        updated_at: undefined,
        name_category: undefined
      });
      expect(logging.info).toHaveBeenCalledWith('Atualizando receita');
      expect(modelMock.update).toHaveBeenCalledWith(
        {
          id_category: params.id_category,
          name: params.name,
          preparation_time_minutes: params.preparation_time_minutes,
          servings: params.servings,
          preparation_method: '["updated_method"]',
          ingredients: '["updated_ingredients"]'
        },
        { where: { id: params.id, id_user: params.id_user }, returning: true }
      );
      expect(modelMock.update).toHaveBeenCalledTimes(1);
    });

    it('should throw error if recipe not found for update', async () => {
      const params = {
        id: 999,
        id_user: 1,
        id_category: 5,
        name: 'updated_name',
        preparation_time_minutes: 45,
        servings: 6,
        preparation_method: ['updated_method'],
        ingredients: ['updated_ingredients']
      };
      modelMock.update.mockResolvedValue([0, []]);

      await expect(
        recipeRepositoryMock.update(
          {
            id_category: params.id_category,
            name: params.name,
            preparation_time_minutes: params.preparation_time_minutes,
            servings: params.servings,
            preparation_method: params.preparation_method,
            ingredients: params.ingredients
          },
          { id: params.id, id_user: params.id_user }
        )
      ).rejects.toThrow('Receita não encontrada');

      expect(logging.info).toHaveBeenCalledWith('Atualizando receita');
      expect(logging.info).toHaveBeenCalledWith(
        'Receita não encontrada para atualização',
        {
          id: params.id,
          id_user: params.id_user
        }
      );
      expect(modelMock.update).toHaveBeenCalledWith(
        {
          id_category: params.id_category,
          name: params.name,
          preparation_time_minutes: params.preparation_time_minutes,
          servings: params.servings,
          preparation_method: '["updated_method"]',
          ingredients: '["updated_ingredients"]'
        },
        { where: { id: params.id, id_user: params.id_user }, returning: true }
      );
      expect(modelMock.update).toHaveBeenCalledTimes(1);
    });
  });
});
