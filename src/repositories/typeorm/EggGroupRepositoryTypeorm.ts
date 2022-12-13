import { AppDataSource } from "database/datasource";
import { EggGroup } from "entities/EggGroup";
import { IEggGroupRepository } from "repositories/IEggGroupRepository";

class EggGroupRepositoryTypeorm implements IEggGroupRepository{
  constructor() {

  }
  async doesTheseEggGroupsExist(eggGroupsIds: number[]): Promise<boolean[]> {
    const eggGroups = await AppDataSource
      .getRepository(EggGroup)
      .createQueryBuilder()
      .getMany();
    
    const pokemonTypesIds = eggGroups.map(p => p.id);

    return eggGroupsIds.map(typeId => pokemonTypesIds.includes(typeId));
  }
  async findAll(): Promise<EggGroup[]> {
    return await AppDataSource
      .getRepository(EggGroup)
      .createQueryBuilder()
      .getMany();
  }
}

export { EggGroupRepositoryTypeorm };