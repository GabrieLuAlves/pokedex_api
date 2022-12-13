interface IFindPokemonsDTO {
  name: string | undefined;
  weight: number | undefined;
  typesIds: number[] | undefined;
  eggGroupId: number | undefined;
}

export { IFindPokemonsDTO };