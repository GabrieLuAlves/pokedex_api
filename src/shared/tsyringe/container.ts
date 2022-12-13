import { PokemonRepositoryInMemory } from "repositories/in-memory/PokemonRepositoryInMemory";
import { IPokemonRepository } from "repositories/IPokemonRepository";
import { IPokemonTypeRepository } from "repositories/IPokemonTypeRepository";
import { PokemonRepositoryTypeorm } from "repositories/typeorm/PokemonRepositoryTypeorm";
import { PokemonTypeRepositoryTypeorm } from "repositories/typeorm/PokemonTypeRepositoryTypeorm";
import { container } from "tsyringe";

container.registerSingleton<IPokemonRepository>(
  "PokemonRepository",
  PokemonRepositoryTypeorm
);

container.registerSingleton<IPokemonTypeRepository>(
  "PokemonTypeRepository",
  PokemonTypeRepositoryTypeorm
);

export { container };