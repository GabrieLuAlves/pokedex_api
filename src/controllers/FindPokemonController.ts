import { Request, Response } from "express";
import { FindPokemonService } from "services/FindPokemonService";
import { container } from "tsyringe";

class FindPokemonController {
  async handle(request: Request, response: Response) {
    let { name, weight, typesIds, eggGroupId } = request.body;

    if(!typesIds) {
      typesIds = []
    }

    const findPokemonService = container.resolve(FindPokemonService);

    return response.json(await findPokemonService.execute({ name, weight, typesIds, eggGroupId }));
  }
}

export { FindPokemonController };