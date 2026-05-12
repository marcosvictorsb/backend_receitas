import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { logging } from '../configs/logger';

dotenv.config();

export const authMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  try {
    const authHeader =
      request.headers.authorization || request.headers.Authorization || '';
    if (!authHeader || Array.isArray(authHeader)) {
      logging.info('Token não fornecido no cabeçalho de autorização');
      return response.status(401).json({ error: 'No token provided' });
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2) {
      logging.info('Formato de token inválido no cabeçalho de autorização');
      return response.status(401).json({ error: 'Invalid token format' });
    }

    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme)) {
      logging.info('Token malformado no cabeçalho de autorização');
      return response.status(401).json({ error: 'Token malformatted' });
    }
    jwt.verify(token, process.env.JWT_SECRET as string, (error, decoded) => {
      if (error) {
        return response.status(401).json({ error: 'Invalid token' });
      }

      const payload = decoded as JwtPayload & {
        userId: number;
      };

      request.user = {
        id: payload.userId
      };

      return next();
    });
  } catch (error: unknown) {
    logging.error('Error in auth middleware:', error);
    return response
      .status(500)
      .json({ error: 'Internal server error during token validation' });
  }
};
