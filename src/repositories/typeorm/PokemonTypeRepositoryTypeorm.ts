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
    const pokemonType = await this.pokemonTypeRepository
        .createQueryBuilder()
        .getMany();
    
    const pokemonTypesIds = pokemonType.map(p => p.id);

    return typesIds.map(typeId => pokemonTypesIds.includes(typeId));
  }

  async findAll(): Promise<PokemonType[]> {
    return await this.pokemonTypeRepository
      .createQueryBuilder()
      .getMany();
  }
}

export { PokemonTypeRepositoryTypeorm };