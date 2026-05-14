import { IFindCategoriesService } from '../interfaces/category.interfaces';
import { Request, Response } from 'express';

export class FindCategoriesController {
  constructor(private readonly service: IFindCategoriesService) {}

  async handle(_request: Request, response: Response) {
    const { status, body } = await this.service.execute();
    return response.status(status).json(body);
  }
}
