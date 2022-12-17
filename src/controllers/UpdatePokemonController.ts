import { Request, Response } from "express";
import { UpdatePokemonService } from "services/UpdatePokemonService";
import { container } from "tsyringe";

class UpdatePokemonController {
  async handle(request: Request, response: Response) {
    const { id, name, weight, typesIds, eggGroupId } = request.body;
    const updatePokemonService = container.resolve(UpdatePokemonService)

    return response.json(updatePokemonService.execute({ id, name, weight, typesIds, eggGroupId }));
  }
}

export { UpdatePokemonController };