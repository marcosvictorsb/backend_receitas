import { Router, Request, Response } from 'express';
import { makeFindCategoryController } from '../../factory/find.category.factory';
import { authMiddleware } from '../../../middlewares/auth.jwt.middleware';

const router = Router();

const categoryController = makeFindCategoryController();
router.get('/', authMiddleware, (request: Request, response: Response) =>
  categoryController.handle(request, response)
);

export default router;
