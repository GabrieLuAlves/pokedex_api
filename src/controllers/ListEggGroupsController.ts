import { Request, Response } from "express";
import { ListEggGroupsService } from "services/ListEggGroupsService";
import { container } from "tsyringe";

class ListEggGroupsController {
  async handle(request: Request, response: Response) {
    const listEggGroupsService = container.resolve(ListEggGroupsService);

    return response.json(await listEggGroupsService.execute());
  }
}

export { ListEggGroupsController };