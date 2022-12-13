import { AppError } from "errors/AppError";
import { IEggGroupRepository } from "repositories/IEggGroupRepository";
import { IPokemonRepository } from "repositories/IPokemonRepository";
import { IPokemonTypeRepository } from "repositories/IPokemonTypeRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class CreatePokemonService {
  constructor(
    @inject("PokemonRepository")
    private pokemonRepository: IPokemonRepository,

    @inject("PokemonTypeRepository")
    private pokemonTypeRepository: IPokemonTypeRepository,

    @inject("EggGroupRepository")
    private eggGroupRepository: IEggGroupRepository
  ) {}

  async execute({ name, weight, typesIds, eggGroupId }: IRequest) {
    const pokemonExists = (await this.pokemonRepository.findByName(name)).length > 0;

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

    if (pokemonExists) {
      throw new AppError("A pokemon with this name already exists");
    }

    await this.pokemonRepository.create({ name, weight, typesIds, eggGroupId });
  }
}

interface IRequest {
  name: string;
  weight: number;
  typesIds: number[];
  eggGroupId: number;
}

export { CreatePokemonService };