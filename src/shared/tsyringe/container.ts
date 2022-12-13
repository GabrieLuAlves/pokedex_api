import { IEggGroupRepository } from "repositories/IEggGroupRepository";
import { PokemonRepositoryInMemory } from "repositories/in-memory/PokemonRepositoryInMemory";
import { IPokemonRepository } from "repositories/IPokemonRepository";
import { IPokemonTypeRepository } from "repositories/IPokemonTypeRepository";
import { EggGroupRepositoryTypeorm } from "repositories/typeorm/EggGroupRepositoryTypeorm";
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

container.registerSingleton<IEggGroupRepository>(
  "EggGroupRepository",
  EggGroupRepositoryTypeorm
);

export { container };