import { Request, Response } from 'express';
import {
  DeleteRecipeControllerDependencies,
  IDeleteRecipeService
} from '../interfaces/delete.recipe.interface';

export class DeleteRecipeController {
  protected service: IDeleteRecipeService;

  constructor(params: DeleteRecipeControllerDependencies) {
    this.service = params.service;
  }

  async handle(request: Request, response: Response) {
    const id = Number(request.params.id);
    const id_user = Number(request.user?.id);

    const { status, body } = await this.service.execute({ id, id_user });

    return response.status(status).json(body);
  }
}
