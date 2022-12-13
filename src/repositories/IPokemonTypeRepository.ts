import { PokemonType } from "entities/PokemonType";

interface IPokemonTypeRepository {
  doesTheseTypesExist(typesIds: number[]): Promise<boolean[]>;
  findAll(): Promise<PokemonType[]>;
}

export { IPokemonTypeRepository };