import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreatePokemonsTable1670680075259 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: "pokemons",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment"
          },
          {
            name: "name",
            type: "varchar"
          },
          {
            name: "weight",
            type: "float"
          },
        ]
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("pokemons");
    }

}
