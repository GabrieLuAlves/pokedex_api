import { AppDataSource } from "database/datasource";
import { ICreatePokemonDTO } from "dtos/ICreatePokemonDTO";
import { IFindPokemonsDTO } from "dtos/IFindPokemonsDTO";
import { IUpdatePokemonDTO } from "dtos/IUpdatePokemonDTO";
import { EggGroup } from "entities/EggGroup";
import { Pokemon } from "entities/Pokemon";
import { PokemonType } from "entities/PokemonType";
import { IPokemonRepository } from "repositories/IPokemonRepository";
import { ObjectLiteral, Repository, SelectQueryBuilder } from "typeorm";

class PokemonRepositoryTypeorm implements IPokemonRepository {
  private pokemonRepository: Repository<Pokemon>;
  private pokemonTypeRepository: Repository<PokemonType>;
  private eggGroupRepository: Repository<EggGroup>;

  constructor(){
    this.pokemonRepository = AppDataSource.getRepository(Pokemon);
    this.pokemonTypeRepository = AppDataSource.getRepository(PokemonType);
    this.eggGroupRepository = AppDataSource.getRepository(EggGroup);
  }

  async create({ name, weight, typesIds, eggGroupId }: ICreatePokemonDTO): Promise<void> {
    const eggGroup = await this.eggGroupRepository
      .createQueryBuilder("egg_group")
      .where("egg_group.id = :eggGroupId", { eggGroupId })
      .getMany();

    const types = await this.pokemonTypeRepository
      .createQueryBuilder("type")
      .where("type.id IN (:...typesIds)", { typesIds })
      .getMany();

    const pokemon = { 
      name,
      weight,
      eggGroup: eggGroup[0],
    };

    await this.pokemonRepository
      .createQueryBuilder()
      .insert()
      .values(pokemon)
      .execute();

    const promises = types.map(type => {
      return AppDataSource
        .createQueryBuilder()
        .relation(PokemonType, "pokemons")
        .of(type)
        .add(pokemon);
    });

    await Promise.all(promises);
  }

  async findById(id: number): Promise<Pokemon | null> {
    const pokemon = this.pokemonRepository
      .createQueryBuilder()
      .where("pokemon.id = :id")
      .getOne();
    
    return pokemon;
  }

  async findByName(name: string): Promise<Pokemon[]> {
    const queryBuilder = this.pokemonRepository
      .createQueryBuilder("pokemon")
      .where("pokemon.name = :name", { name })
      .getMany();

    return queryBuilder;
  }

/*
SELECT
	pokemons.*
FROM
	pokemons
WHERE
	pokemons.id IN (SELECT pokemons.id FROM pokemons, pokemons_types WHERE pokemons.id = pokemons_types.pokemon_id AND pokemons_types.type_id = 1) AND
	pokemons.id IN (SELECT pokemons.id FROM pokemons, pokemons_types WHERE pokemons.id = pokemons_types.pokemon_id AND pokemons_types.type_id = 3)
*/

  async find({ name, weight, typesIds, eggGroupId }: IFindPokemonsDTO): Promise<Pokemon[]> {
    const query = AppDataSource
      .createQueryBuilder()
      .from("pokemons", "p")
      .select("p.*")
    
    const subQueryGenerator = (qb: SelectQueryBuilder<ObjectLiteral>, typeId: number) => qb.subQuery()
      .from("pokemons", "p")
      .addFrom("pokemons_types", "p_t")
      .select("p.id")
      .where("p.id = p_t.pokemon_id")
      .andWhere(`p_t.type_id = ${typeId}`)
      .getQuery()
    
    if (name !== undefined) {
      query.andWhere("p.name = :name", { name });
    }

    if (weight != undefined) {
      query.andWhere("p.weight = :weight", { weight });
    }

    if (typesIds !== undefined) {
      typesIds.forEach((typeId) => query.andWhere(qb => "p.id IN (" + subQueryGenerator(qb, typeId) + ")"));
    }

    if (eggGroupId !== undefined) {
      query.andWhere("p.egg_group_id = :eggGroupId", { eggGroupId })
    }

    return await query.getRawMany<Pokemon>();
  }

  async update({ id, name, weight, typesIds, eggGroupId }: IUpdatePokemonDTO): Promise<void> {
    const eggGroup = await this.eggGroupRepository
      .createQueryBuilder("egg_group")
      .where("egg_group.id = :eggGroupId", { eggGroupId })
      .getOne();

    if (eggGroup === null) return;


    const newPokemonTypes = await this.pokemonTypeRepository
      .createQueryBuilder("type")
      .where("type.id IN (:...typesIds)", { typesIds })
      .getMany();

    const oldPokemonTypes = await this.pokemonRepository
      .createQueryBuilder()
      .relation(Pokemon, "types")
      .of(id)
      .loadMany();
    
    await this.pokemonRepository
      .createQueryBuilder()
      .update(Pokemon)
      .set({
        name,
        weight,
        eggGroup
      })
      .where("pokemons.id = :id", { id })
      .execute();
    
    await this.pokemonRepository
      .createQueryBuilder()
      .relation(Pokemon, "types")
      .of(id)
      .addAndRemove(newPokemonTypes, oldPokemonTypes)
  }
}

export { PokemonRepositoryTypeorm };