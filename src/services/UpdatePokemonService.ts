import { AppError } from "errors/AppError";
import { IEggGroupRepository } from "repositories/IEggGroupRepository";
import { IPokemonRepository } from "repositories/IPokemonRepository";
import { IPokemonTypeRepository } from "repositories/IPokemonTypeRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class UpdatePokemonService {
  constructor(
    @inject("PokemonRepository")
    private pokemonRepository: IPokemonRepository,

    @inject("PokemonTypeRepository")
    private pokemonTypeRepository: IPokemonTypeRepository,

    @inject("EggGroupRepository")
    private eggGroupRepository: IEggGroupRepository
  ) {}

  async execute({ id, name, weight, typesIds, eggGroupId } : IRequest) {
    const pokemonDoesntExist = (await this.pokemonRepository.findByName(name)).length == 0;

    const oneOfTheseTypesDoesntExist =
      (await this.pokemonTypeRepository.doesTheseTypesExist(typesIds)).some(type => !type);

    const thisEggGroupDoesntExist =
      (await this.eggGroupRepository.doesTheseEggGroupsExist([eggGroupId])).some(type => !type);

    if(typesIds.length > 2 || typesIds.length == 0) {
      throw new AppError("A pokemon can have one or two types only");
    }

    if (oneOfTheseTypesDoesntExist) {
      throw new AppError("One or more specified types does not exist");
    }

    if (thisEggGroupDoesntExist) {
      throw new AppError("The informed egg group does not exist");
    }

    if (pokemonDoesntExist) {
      throw new AppError("The specified id does not correspond to any existing pokemon");
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