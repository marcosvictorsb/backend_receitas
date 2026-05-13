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
    const { id, id_category, name, page, limit, search } = request.query;
    const id_user = Number(request.user?.id);

    const { status, body } = await this.service.execute({
      id: id ? Number(id) : undefined,
      id_user,
      id_category: id_category ? Number(id_category) : undefined,
      name: name ? String(name) : undefined,
      page: page ? Number(page) : 1,
      limit: limit ? Number(limit) : 10,
      search: search ? String(search) : undefined
    });

    return response.status(status).json(body);
  }
}
