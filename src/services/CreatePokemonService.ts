import { AppError } from "errors/AppError";
import { IPokemonRepository } from "repositories/IPokemonRepository";
import { IPokemonTypeRepository } from "repositories/IPokemonTypeRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class CreatePokemonService {
  constructor(
    @inject("PokemonRepository")
    private pokemonRepository: IPokemonRepository,

    @inject("PokemonTypeRepository")
    private pokemonTypeRepository: IPokemonTypeRepository
  ) {}

  async execute({ name, weight, typesIds, eggGroupId }: IRequest) {
    const existingPokemons = await this.pokemonRepository.findByName(name);

    if(typesIds.length > 2 || typesIds.length == 0) {
      throw new AppError("A pokemon can have one or two types only");
    }

    const typesExists = await this.pokemonTypeRepository.doesTheseTypesExist(typesIds);

    if (!typesExists) {
      throw new AppError("One or more specified types does not exist");
    }

    if (existingPokemons.length > 0) {
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