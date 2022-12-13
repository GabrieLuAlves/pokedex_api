import { IEggGroupRepository } from "repositories/IEggGroupRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListEggGroupsService {
  constructor(
    @inject("EggGroupRepository")
    private eggGroupRepository: IEggGroupRepository
  ) {}

  async execute() {
    return this.eggGroupRepository.findAll();
  }
}

export { ListEggGroupsService };