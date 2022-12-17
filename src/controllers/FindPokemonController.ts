import { Request, Response } from "express";
import { FindPokemonService } from "services/FindPokemonService";
import { container } from "tsyringe";
import { parseQueryParams } from "utils";

class FindPokemonController {
  async handle(request: Request, response: Response) {
    let { name, weight, typesIds, eggGroupId } = request.query;

    const params = {
      name: parseQueryParams(name),
      weight: parseQueryParams(weight),
      typesIds: parseQueryParams(typesIds),
      eggGroupId: parseQueryParams(eggGroupId),
    };

    if (!typesIds) {
      typesIds = [];
    }

    const findPokemonService = container.resolve(FindPokemonService);

    return response.json(await findPokemonService.execute(params));
  }
}

export { FindPokemonController };
