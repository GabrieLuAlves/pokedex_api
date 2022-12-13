import { Pokemon } from "entities/Pokemon";
import { AppError } from "errors/AppError";
import { IPokemonRepository } from "repositories/IPokemonRepository";
import { IPokemonTypeRepository } from "repositories/IPokemonTypeRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class FindPokemonService {
  constructor(
    @inject("PokemonRepository")
    private pokemonRepository: IPokemonRepository,

    @inject("PokemonTypeRepository")
    private pokemonTypeRepository: IPokemonTypeRepository
  ){}

  async execute({ name, typesIds, eggGroupId } : IRequest): Promise<Pokemon[]> {

    if(typesIds !== undefined) {
      const doesTheseTypesExist = await this.pokemonTypeRepository.doesTheseTypesExist(typesIds);
      
      if (!doesTheseTypesExist) {
        throw new AppError("One or more specified types does not exist");
      }
    }

    return this.pokemonRepository.findByTypeOrEggGroup({ name, typesIds, eggGroupId });
  }
}

interface IRequest {
  name: string | undefined;
  typesIds: number[] | undefined;
  eggGroupId: number | undefined;
};

export { FindPokemonService };