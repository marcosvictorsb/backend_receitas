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
import { deleteRecipeParamsSchema } from '../validators/delete.recipe.schema';
import { makeUpdateRecipeController } from '../factory/update.recipe.factory';
import {
  updateRecipeBodySchema,
  updateRecipeParamsSchema
} from '../validators/update.recipe.schema';
import { findRecipeQuerySchema } from '../validators/find.recipe.schema';

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
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Dados de entrada inválidos'
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       path:
 *                         type: string
 *                         example: 'preparation_method'
 *                       message:
 *                         type: string
 *                         example: 'Invalid input: expected array, received undefined'
 *       401:
 *         description: Token JWT não fornecido ou inválido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'No token provided'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Erro ao criar receita'
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
 *     description: Busca receitas na base de dados com suporte a filtros por id, id_user, id_category, name, page, limit e search. Todos os parâmetros são opcionais.
 *     security:
 *       - BearerAuth: []
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
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         description: Número da página
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *         description: Quantidade de itens por página
 *         example: 10
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Texto para busca
 *         example: ''
 *     responses:
 *       200:
 *         description: Lista de receitas retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FindRecipeSuccess'
 *       400:
 *         description: Parâmetros de query inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Dados de entrada inválidos'
 *       401:
 *         description: Token JWT não fornecido ou inválido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'No token provided'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Erro ao buscar receitas'
 */

const findRecipeController = makeFindRecipeController();
router.get(
  '/',
  validateQuery(findRecipeQuerySchema),
  authMiddleware,
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
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'No token provided'
 *       404:
 *         description: Receita não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Receita não encontrada'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Erro ao excluir receita'
 */
const deleteRecipeController = makeDeleteRecipeController();

router.delete(
  '/:id',
  authMiddleware,
  validateParams(deleteRecipeParamsSchema),
  (request: Request, response: Response) =>
    deleteRecipeController.handle(request, response)
);

/**
 * @openapi
 * /v1/recipes/{id}:
 *   put:
 *     tags:
 *       - Recipes
 *     summary: Atualiza uma receita
 *     description: Atualiza os dados de uma receita pelo ID, validando se ela pertence ao usuário autenticado. Requer token JWT.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID da receita a ser atualizada
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateRecipeBody'
 *     responses:
 *       200:
 *         description: Receita atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateRecipeSuccess'
 *       400:
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: 'Dados de entrada inválidos'
 *                  errors:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                        path:
 *                          type: string
 *                          example: 'preparation_method'
 *                        message:
 *                          type: string
 *                          example: 'Invalid input: expected array, received undefined'
 *       401:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'No token provided'
 *       404:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Receita não encontrada'
 *       500:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Erro ao atualizar receita'
 */

const updateRecipeController = makeUpdateRecipeController();

router.put(
  '/:id',
  authMiddleware,
  validateParams(updateRecipeParamsSchema),
  validateBody(updateRecipeBodySchema),
  (request: Request, response: Response) =>
    updateRecipeController.handle(request, response)
);

export default router;
