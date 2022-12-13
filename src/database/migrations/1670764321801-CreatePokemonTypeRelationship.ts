import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from "typeorm"

export class CreatePokemonTypeRelationship1670764321801 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: "pokemons_types",
        columns: [
          {
            name: "pokemon_id",
            type: "int"
          },
          {
            name: "type_id",
            type: "int"
          }
        ]
      }));

      await queryRunner.createForeignKey("pokemons_types", new TableForeignKey({
        name: "FK_type_pokemon",
        columnNames: ["type_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "types",
        onDelete: "SET NULL",
        onUpdate: "SET NULL"
      }));

      await queryRunner.createForeignKey("pokemons_types", new TableForeignKey({
        name: "FK_pokemon_type",
        columnNames: ["pokemon_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "pokemons",
        onDelete: "SET NULL",
        onUpdate: "SET NULL"
      }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey("pokemons", "type");
    }
}
