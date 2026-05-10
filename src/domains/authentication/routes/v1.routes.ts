import { Router, Request, Response } from 'express';
import { makeSignUpController } from '../factories/signup.factory';
import { validateBody } from '../../../configs/validate.schema.moddleware';
import { signUpBodySchema } from '../validators/signup.schema';
import { makeSignInController } from '../factories/singin.factory';
import { signInBodySchema } from '../validators/signin.schema';

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

const signInController = makeSignInController();

/**
 * @openapi
 * /v1/auth/signin:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Realiza login do usuario
 *     description: Valida login e senha e retorna um token JWT.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignInBody'
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SignInSuccess'
 *       400:
 *         description: Login ou senha incorretos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Erro interno do servidor
 */
router.post(
  '/signin',
  validateBody(signInBodySchema),
  (request: Request, response: Response) =>
    signInController.handle(request, response)
);

export default router;
