import { EggGroup } from "entities/EggGroup";

interface IEggGroupRepository {
  doesTheseEggGroupsExist(eggGroupsIds: number[]): Promise<boolean[]>;
  findAll(): Promise<EggGroup[]>;
}

export { IEggGroupRepository };