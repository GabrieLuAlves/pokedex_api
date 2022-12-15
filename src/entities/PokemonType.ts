import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Pokemon } from "./Pokemon";

@Entity("types")
class PokemonType {
  @PrimaryGeneratedColumn({ name: "id", type: "int" })
  id: number;

  @Column({ name: "type", type: "varchar" })
  type: string;

  @ManyToMany(() => Pokemon, pokemon => pokemon.types)
  @JoinTable({
    name: "pokemons_types",
    joinColumns: [{ name: "type_id" }],
    inverseJoinColumns: [{ name: "pokemon_id" }]
  })
  pokemons: Pokemon[];
}

export { PokemonType };