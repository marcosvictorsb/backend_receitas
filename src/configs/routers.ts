import { Router } from 'express';

import authRoutes from '../domains/authentication/routes/v1.routes';
import recipesRoutes from '../domains/recipes/routes/v1.routes';
import categoriesRoutes from '../domains/categories/routes/v1.routes';

const routers = Router();

routers.use('/v1/auth', authRoutes);
routers.use('/v1/recipes', recipesRoutes);
routers.use('/v1/categories', categoriesRoutes);

export default routers;
