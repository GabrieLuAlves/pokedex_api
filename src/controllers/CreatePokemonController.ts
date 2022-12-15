import { Request, Response } from "express";
import { CreatePokemonService } from "services/CreatePokemonService";
import { container } from "tsyringe";

class CreatePokemonController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, weight,typesIds, eggGroupId } = request.body;
    const createPokemonService = container.resolve(CreatePokemonService);
    await createPokemonService.execute({ name, weight, typesIds, eggGroupId });
    return response.status(201).send();
  }
}

export { CreatePokemonController };