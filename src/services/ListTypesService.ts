import { IPokemonTypeRepository } from "repositories/IPokemonTypeRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListTypesService {
  constructor(
    @inject("PokemonTypeRepository")
    private pokemonTypeRepository: IPokemonTypeRepository
  ) {}

  async execute() {
    return this.pokemonTypeRepository.findAll();
  }
}

export { ListTypesService };