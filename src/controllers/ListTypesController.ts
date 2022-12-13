import { Request, Response } from "express";
import { ListTypesService } from "services/ListTypesService";
import { container } from "tsyringe";

class ListTypesController {
  async handle(request: Request, response: Response) {
    const listTypesService = container.resolve(ListTypesService);

    return response.json(await listTypesService.execute());
  }
}

export { ListTypesController };