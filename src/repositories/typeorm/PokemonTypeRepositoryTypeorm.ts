import { AppDataSource } from "database/datasource";
import { PokemonType } from "entities/PokemonType";
import { IPokemonTypeRepository } from "repositories/IPokemonTypeRepository";
import { Repository } from "typeorm";

class PokemonTypeRepositoryTypeorm implements IPokemonTypeRepository{
  private pokemonTypeRepository: Repository<PokemonType>;

  constructor() {
    this.pokemonTypeRepository = AppDataSource.getRepository(PokemonType);
  }

  async doesTheseTypesExist(typesIds: number[]): Promise<boolean[]> {
    const pokemon_types = await this.pokemonTypeRepository
        .createQueryBuilder()
        .getMany();

    const results = typesIds.map(
      typeId => pokemon_types.find(pokemon_type => pokemon_type.id == typeId) !== undefined
    );
    
    return results;
  }

  async findAll(): Promise<PokemonType[]> {
    return await this.pokemonTypeRepository
      .createQueryBuilder()
      .getMany();
  }
}

export { PokemonTypeRepositoryTypeorm };