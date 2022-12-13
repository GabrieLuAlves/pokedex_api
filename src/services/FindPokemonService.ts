import { Pokemon } from "entities/Pokemon";
import { AppError } from "errors/AppError";
import { IEggGroupRepository } from "repositories/IEggGroupRepository";
import { IPokemonRepository } from "repositories/IPokemonRepository";
import { IPokemonTypeRepository } from "repositories/IPokemonTypeRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class FindPokemonService {
  constructor(
    @inject("PokemonRepository")
    private pokemonRepository: IPokemonRepository,

    @inject("PokemonTypeRepository")
    private pokemonTypeRepository: IPokemonTypeRepository,

    @inject("EggGroupRepository")
    private eggGroupRepository: IEggGroupRepository
  ){}

  async execute({ name, weight, typesIds, eggGroupId } : IRequest): Promise<Pokemon[]> {
    if(typesIds !== undefined) {
      const oneOfTheseTypesDoesntExist =
        (await this.pokemonTypeRepository.doesTheseTypesExist(typesIds)).some(typeId => !typeId);
      
      if (oneOfTheseTypesDoesntExist) {
        throw new AppError("One or more specified types does not exist");
      }
    }

    if(eggGroupId !== undefined) {
      const thisEggGroupDoesntExist =
        (await this.eggGroupRepository.doesTheseEggGroupsExist([eggGroupId])).some(typeId => !typeId);
      
      if (thisEggGroupDoesntExist) {
        throw new AppError("The specified egg group does not exist");
      }
    }

    return this.pokemonRepository.find({ name, weight, typesIds, eggGroupId });
  }
}

interface IRequest {
  name: string | undefined;
  weight: number | undefined;
  typesIds: number[] | undefined;
  eggGroupId: number | undefined;
};

export { FindPokemonService };