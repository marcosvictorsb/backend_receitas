import { Router, Request, Response } from 'express';
import { makeFindCategoryController } from '../../factory/find.category.factory';
import { authMiddleware } from '../../../middlewares/auth.jwt.middleware';

const router = Router();

/**
 * @openapi
 * /v1/categories:
 *   get:
 *     tags:
 *       - Categories
 *     summary: Lista todas as categorias
 *     description: Retorna todas as categorias disponíveis para receitas. Requer token JWT.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de categorias retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 categories:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                         example: 1
 *                       nome:
 *                         type: string
 *                         example: Bolos e tortas doces
 *       401:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
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
 *                   example: 'Erro ao buscar categorias'
 */
const categoryController = makeFindCategoryController();
router.get('/', authMiddleware, (request: Request, response: Response) =>
  categoryController.handle(request, response)
);

export default router;
