import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Pokemon } from "./Pokemon";

@Entity("egg_groups")
class EggGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  egg_group: string;

  @OneToMany(() => Pokemon, pokemon => pokemon.eggGroup)
  pokemons: Pokemon[];
}

export { EggGroup };