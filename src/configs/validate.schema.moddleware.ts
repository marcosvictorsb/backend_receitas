import { NextFunction, Request, Response } from 'express';
import { ZodTypeAny } from 'zod';

export const validateBody = (schema: ZodTypeAny) => {
  return (request: Request, response: Response, next: NextFunction) => {
    const result = schema.safeParse(request.body);

    if (!result.success) {
      return response.status(400).json({
        message: 'Dados de entrada inválidos',
        errors: result.error.issues.map((issue) => ({
          path: issue.path.join('.'),
          message: issue.message
        }))
      });
    }

    request.body = result.data;
    return next();
  };
};

export const validateQuery = (schema: ZodTypeAny) => {
  return (request: Request, response: Response, next: NextFunction) => {
    const result = schema.safeParse(request.query);

    if (!result.success) {
      return response.status(400).json({
        message: 'Dados de entrada inválidos',
        errors: result.error.issues.map((issue) => ({
          path: issue.path.join('.'),
          message: issue.message
        }))
      });
    }

    request.query = result.data as Request['query'];
    return next();
  };
};

export const validateParams = (schema: ZodTypeAny) => {
  return (request: Request, response: Response, next: NextFunction) => {
    const result = schema.safeParse(request.params);

    if (!result.success) {
      return response.status(400).json({
        message: 'Dados de entrada inválidos',
        errors: result.error.issues.map((issue) => ({
          path: issue.path.join('.'),
          message: issue.message
        }))
      });
    }

    request.params = result.data as Request['params'];
    return next();
  };
};
