import { AppError } from "errors/AppError";
import { IPokemonRepository } from "repositories/IPokemonRepository";
import { IPokemonTypeRepository } from "repositories/IPokemonTypeRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class UpdatePokemonService {
  constructor(
    @inject("PokemonRepository")
    private pokemonRepository: IPokemonRepository,

    @inject("PokemonTypeRepository")
    private pokemonTypeRepository: IPokemonTypeRepository
  ) {}

  async execute({ id, name, weight, typesIds, eggGroupId } : IRequest) {
    if(typesIds !== undefined) {
      const doesTheseTypesExist = await this.pokemonTypeRepository.doesTheseTypesExist(typesIds);
      
      if (!doesTheseTypesExist) {
        throw new AppError("One or more specified types does not exist");
      }
    }

    await this.pokemonRepository.update({ id, name, weight, typesIds, eggGroupId })
  }
}

interface IRequest {
  id: number;
  name: string;
  weight: number;
  typesIds: number[];
  eggGroupId: number;
}

export { UpdatePokemonService };