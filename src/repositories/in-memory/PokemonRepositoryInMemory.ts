import { ICreatePokemonDTO } from "dtos/ICreatePokemonDTO";
import { Pokemon } from "entities/Pokemon";
import { IPokemonRepository } from "repositories/IPokemonRepository";

class PokemonRepositoryInMemory implements IPokemonRepository {
  pokemons: Pokemon[] = []
  
  async create({ name, weight }: ICreatePokemonDTO): Promise<void> {
    const pokemon = new Pokemon();
    Object.assign(pokemon, {
      name,
      weight
    });

    this.pokemons.push(pokemon);
  }

  async findByName(name: string): Promise<Pokemon[]> {
    return this.pokemons.filter(pokemon => pokemon.name === name);
  }
}

export { PokemonRepositoryInMemory };