import "reflect-metadata";
import { DataSource } from "typeorm";

import { Pokemon } from "entities/Pokemon";
import { CreatePokemonsTable1670680075259 } from "database/migrations/1670680075259-CreatePokemonsTable";
import { CreatePokemonTypesTable1670763538045 } from "./migrations/1670763538045-CreatePokemonTypesTable";
import { CreatePokemonTypeRelationship1670764321801 } from "./migrations/1670764321801-CreatePokemonTypeRelationship";
import { PokemonType } from "entities/PokemonType";
import { EggGroup } from "entities/EggGroup";
import { CreateEggGroupTable1670788138938 } from "./migrations/1670788138938-CreateEggGroupTable";

const AppDataSource = new DataSource({
    type: "postgres",
    host: "0.0.0.0",
    port: 5432,
    username: "pokemon_api",
    database: "pokemon_api",
    password: "bestpassword",
    entities: [
      Pokemon,
      PokemonType,
      EggGroup
    ],
    migrations: [
      CreatePokemonsTable1670680075259,
      CreatePokemonTypesTable1670763538045,
      CreatePokemonTypeRelationship1670764321801,
      CreateEggGroupTable1670788138938
    ],
    logging: ["query"],
    synchronize: true
  });
  
AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    });

export { AppDataSource };