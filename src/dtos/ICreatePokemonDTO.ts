interface ICreatePokemonDTO {
  name: string;
  weight: number;
  typesIds: number[];
  eggGroupId: number;
}

export { ICreatePokemonDTO };