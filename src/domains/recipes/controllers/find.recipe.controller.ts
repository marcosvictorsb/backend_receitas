import { Request, Response } from 'express';
import {
  FindRecipeControllerDependencies,
  IFindRecipeService
} from '../interfaces/find.recipe.interface';

export class FindRecipeController {
  protected service: IFindRecipeService;

  constructor(params: FindRecipeControllerDependencies) {
    this.service = params.service;
  }

  async handle(request: Request, response: Response) {
    const { id, id_user, id_category, name } = request.query;

    const { status, body } = await this.service.execute({
      id: id ? Number(id) : undefined,
      id_user: id_user ? Number(id_user) : undefined,
      id_category: id_category ? Number(id_category) : undefined,
      name: name ? String(name) : undefined
    });

    return response.status(status).json(body);
  }
}
