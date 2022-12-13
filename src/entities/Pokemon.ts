import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { EggGroup } from "./EggGroup";
import { PokemonType } from "./PokemonType";

@Entity("pokemons")
class Pokemon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  weight: number;

  @ManyToMany(() => PokemonType, type => type.pokemons)
  types: PokemonType[];

  @ManyToOne(() => EggGroup, egg_group => egg_group.pokemons)
  @JoinColumn({ name: "egg_group_id", referencedColumnName: "id", foreignKeyConstraintName: "FK_pokemons" })
  eggGroup: EggGroup;
}

export { Pokemon }