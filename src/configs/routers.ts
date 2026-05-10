import { Request, Response, Router } from 'express';
import authRoutes from '../domains/authentication/routes/v1.routes';

const routers = Router();

routers.use('/v1/auth', authRoutes);

export default routers;
