import { Router, Request, Response } from 'express';
import { makeCreateRecipeController } from '../factory/create.recipe.factory';
import {
  validateBody,
  validateParams,
  validateQuery
} from '../../../configs/validate.schema.moddleware';
import { createRecipeBodySchema } from '../validators/create.recipe.schema';
import { makeFindRecipeController } from '../factory/find.recipe.factory';
import { authMiddleware } from '../../../middlewares/auth.jwt.middleware';
import { makeDeleteRecipeController } from '../factory/delete.recipe.factory';
import { findRecipeQuerySchema } from '../validators/find.recipe.schema';
import { deleteRecipeParamsSchema } from '../validators/delete.recipe.schema';

const router = Router();

/**
 * @openapi
 * /v1/recipes:
 *   post:
 *     tags:
 *       - Recipes
 *     summary: Cria uma nova receita
 *     description: Cria uma receita associada ao usuário autenticado. Requer token JWT.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateRecipeBody'
 *     responses:
 *       201:
 *         description: Receita criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateRecipeSuccess'
 *       400:
 *         description: Dados inválidos na requisição
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Token JWT não fornecido ou inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

const createRecipeController = makeCreateRecipeController();
router.post(
  '/',
  authMiddleware,
  validateBody(createRecipeBodySchema),
  (request: Request, response: Response) =>
    createRecipeController.handle(request, response)
);

/**
 * @openapi
 * /v1/recipes:
 *   get:
 *     tags:
 *       - Recipes
 *     summary: Lista receitas com filtros opcionais
 *     description: Busca receitas na base de dados com suporte a filtros por id, id_user, id_category ou name. Todos os parâmetros são opcionais.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: number
 *         description: ID da receita
 *         example: 1
 *       - in: query
 *         name: id_user
 *         schema:
 *           type: number
 *         description: ID do usuário proprietário
 *         example: 1
 *       - in: query
 *         name: id_category
 *         schema:
 *           type: number
 *         description: ID da categoria
 *         example: 1
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Nome ou parte do nome da receita
 *         example: Bolo
 *     responses:
 *       200:
 *         description: Lista de receitas retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FindRecipeSuccess'
 *       400:
 *         description: Parâmetros de filtro inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

const findRecipeController = makeFindRecipeController();
router.get(
  '/',
  validateQuery(findRecipeQuerySchema),
  (request: Request, response: Response) =>
    findRecipeController.handle(request, response)
);

/**
 * @openapi
 * /v1/recipes/{id}:
 *   delete:
 *     tags:
 *       - Recipes
 *     summary: Deleta uma receita
 *     description: Remove uma receita pelo ID, validando se ela pertence ao usuário autenticado. Requer token JWT.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID da receita a ser removida
 *         example: 1
 *     responses:
 *       200:
 *         description: Receita deletada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteRecipeSuccess'
 *       401:
 *         description: Token JWT não fornecido ou inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Receita não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
const deleteRecipeController = makeDeleteRecipeController();

router.delete(
  '/:id',
  authMiddleware,
  validateParams(deleteRecipeParamsSchema),
  (request: Request, response: Response) =>
    deleteRecipeController.handle(request, response)
);

export default router;
