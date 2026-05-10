import { Request, Response, Router } from 'express';
import authRoutes from '../domains/authentication/routes';

const routers = Router();

routers.use('/v1/auth', authRoutes);

export default routers;
