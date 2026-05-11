import { ModelStatic } from 'sequelize';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { LoggerMock } from '../../../mocks/logger.mock';
import { RecipeRepository } from '../../../../src/domains/recipes/repository/recipe.repository';

const modelMock = {
  findAll: vi.fn(),
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

  describe('findAll', () => {
    it('should find recipes by criteria', async () => {
      const params = { name: 'any_name' };
      const recipeData = [
        {
          id: 'recipe_id',
          id_user: 'user_id',
          id_category: 'category_id',
          name: params.name
        }
      ];
      modelMock.findAll.mockResolvedValue(recipeData);

      const recipes = await recipeRepositoryMock.findAll(params);

      expect(recipes).toEqual([
        {
          id: 'recipe_id',
          id_user: 'user_id',
          id_category: 'category_id',
          name: params.name
        }
      ]);
      expect(logging.info).toHaveBeenCalledWith('Buscando receitas');
      expect(modelMock.findAll).toHaveBeenCalledWith({
        where: params
      });
      expect(modelMock.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return empty array if no recipes found', async () => {
      const params = { name: 'nonexistent_name' };
      modelMock.findAll.mockResolvedValue([]);

      const recipes = await recipeRepositoryMock.findAll(params);

      expect(recipes).toEqual([]);
      expect(logging.info).toHaveBeenCalledWith('Buscando receitas');
      expect(logging.info).toHaveBeenCalledWith('Nenhuma receita encontrada');
      expect(modelMock.findAll).toHaveBeenCalledWith({
        where: params
      });
      expect(modelMock.findAll).toHaveBeenCalledTimes(1);
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
        preparation_method: 'any_method',
        ingredients: 'any_ingredients'
      };
      const recipeData = {
        ...params
      };
      modelMock.create.mockResolvedValue(recipeData);

      const recipe = await recipeRepositoryMock.create(params);

      expect(recipe).toEqual(recipeData);
      expect(logging.info).toHaveBeenCalledWith('Criando receita');
      expect(modelMock.create).toHaveBeenCalledWith(params);
      expect(modelMock.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('delete', () => {
    it('should delete a recipe by id', async () => {
      const params = { id: 1 };
      modelMock.destroy.mockResolvedValue(1);

      const result = await recipeRepositoryMock.delete(params);

      expect(result).toBe(true);
      expect(logging.info).toHaveBeenCalledWith('Deletando receita');
      expect(modelMock.destroy).toHaveBeenCalledWith({
        where: { id: params.id }
      });
      expect(modelMock.destroy).toHaveBeenCalledTimes(1);
    });

    it('should return false if recipe not found for deletion', async () => {
      const params = { id: 999 };
      modelMock.destroy.mockResolvedValue(0);

      const result = await recipeRepositoryMock.delete(params);

      expect(result).toBe(false);
      expect(logging.info).toHaveBeenCalledWith('Deletando receita');
      expect(logging.info).toHaveBeenCalledWith(
        'Receita não encontrada para deleção',
        {
          id: params.id
        }
      );
      expect(modelMock.destroy).toHaveBeenCalledWith({
        where: { id: params.id }
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
        preparation_method: 'updated_method',
        ingredients: 'updated_ingredients'
      };
      const updatedRecipeData = {
        ...params
      };
      modelMock.update.mockResolvedValue([1, [updatedRecipeData]]);

      const recipe = await recipeRepositoryMock.update(params);

      expect(recipe).toEqual(updatedRecipeData);
      expect(logging.info).toHaveBeenCalledWith('Atualizando receita');
      expect(modelMock.update).toHaveBeenCalledWith(params, {
        where: { id: params.id },
        returning: true
      });
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
        preparation_method: 'updated_method',
        ingredients: 'updated_ingredients'
      };
      modelMock.update.mockResolvedValue([0, []]);

      await expect(recipeRepositoryMock.update(params)).rejects.toThrow(
        'Recipe not found'
      );

      expect(logging.info).toHaveBeenCalledWith('Atualizando receita');
      expect(logging.info).toHaveBeenCalledWith(
        'Receita não encontrada para atualização',
        {
          id: params.id
        }
      );
      expect(modelMock.update).toHaveBeenCalledWith(params, {
        where: { id: params.id },
        returning: true
      });
      expect(modelMock.update).toHaveBeenCalledTimes(1);
    });
  });
});
