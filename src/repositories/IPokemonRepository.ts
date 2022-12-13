import { ICreatePokemonDTO } from "dtos/ICreatePokemonDTO";
import { IFindPokemonsDTO } from "dtos/IFindPokemonsDTO";
import { IUpdatePokemonDTO } from "dtos/IUpdatePokemonDTO";
import { Pokemon } from "entities/Pokemon";

interface IPokemonRepository {
  create(data: ICreatePokemonDTO): Promise<void>;
  findById(id: number): Promise<Pokemon | null>;
  findByName(name: string): Promise<Pokemon[]>;
  findByTypeOrEggGroup(data: IFindPokemonsDTO): Promise<Pokemon[]>;
  update(data: IUpdatePokemonDTO): Promise<void>;
}

export { IPokemonRepository };