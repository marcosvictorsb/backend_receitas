import { Request, Response } from 'express';
import {
  UpdateRecipeControllerDependencies,
  IUpdateRecipeService
} from '../interfaces/update.recipe.interface';

export class UpdateRecipeController {
  protected service: IUpdateRecipeService;

  constructor(params: UpdateRecipeControllerDependencies) {
    this.service = params.service;
  }

  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const {
      id_category,
      name,
      preparation_time_minutes,
      servings,
      preparation_method,
      ingredients
    } = request.body;
    const id_user = request.user?.id;

    const { status, body } = await this.service.execute({
      id: Number(id),
      id_category,
      name,
      preparation_time_minutes,
      servings,
      preparation_method,
      ingredients,
      id_user: Number(id_user)
    });

    return response.status(status).json(body);
  }
}
