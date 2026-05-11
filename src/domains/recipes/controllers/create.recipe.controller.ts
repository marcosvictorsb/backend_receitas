import { Request, Response } from 'express';
import {
  CreateRecipeControllerDependencies,
  ICreateRecipeService
} from '../interfaces/create.recipe.interface';

export class CreateRecipeController {
  protected service: ICreateRecipeService;

  constructor(params: CreateRecipeControllerDependencies) {
    this.service = params.service;
  }

  async handle(request: Request, response: Response) {
    const {
      id_user,
      id_category,
      name,
      preparation_time_minutes,
      servings,
      preparation_method,
      ingredients
    } = request.body;

    const { status, body } = await this.service.execute({
      id_user,
      id_category,
      name,
      preparation_time_minutes,
      servings,
      preparation_method,
      ingredients
    });

    return response.status(status).json(body);
  }
}
