interface IUpdatePokemonDTO {
  id: number;
  name: string;
  weight: number;
  typesIds: number[];
  eggGroupId: number;
}

export { IUpdatePokemonDTO };