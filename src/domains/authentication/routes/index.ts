import { Router, Request, Response } from 'express';
import { makeSignUpController } from '../factories/signup.factory';
import { validateBody } from '../../../configs/validate.schema.moddleware';
import { signUpBodySchema } from '../validators/signup.schema';

const router = Router();

const signUpController = makeSignUpController();

/**
 * @openapi
 * /v1/auth/signup:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Cadastra um novo usuario
 *     description: Cria um usuario e retorna os dados basicos do cadastro.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignUpBody'
 *     responses:
 *       201:
 *         description: Usuario cadastrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SignUpSuccess'
 *       400:
 *         description: Dados invalidos ou login ja existente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Erro interno do servidor
 */
router.post(
  '/signup',
  validateBody(signUpBodySchema),
  (request: Request, response: Response) =>
    signUpController.handle(request, response)
);

export default router;
