import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from "typeorm"

export class CreateEggGroupTable1670788138938 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.startTransaction();

      await queryRunner.addColumn("pokemons", new TableColumn({
        name: "egg_group_id",
        type: "int"
      }));

      await queryRunner.createTable(new Table({
        name: "egg_groups",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment"
          },
          {
            name: "egg_group",
            type: "varchar"
          }
        ]
      }));

      await queryRunner.query(`INSERT INTO egg_groups (egg_group) VALUES ('Monster')`);
      await queryRunner.query(`INSERT INTO egg_groups (egg_group) VALUES ('Human-Like')`);
      await queryRunner.query(`INSERT INTO egg_groups (egg_group) VALUES ('Water 1')`);
      await queryRunner.query(`INSERT INTO egg_groups (egg_group) VALUES ('Water 3')`);
      await queryRunner.query(`INSERT INTO egg_groups (egg_group) VALUES ('Bug')`);
      await queryRunner.query(`INSERT INTO egg_groups (egg_group) VALUES ('Mineral')`);
      await queryRunner.query(`INSERT INTO egg_groups (egg_group) VALUES ('Flying')`);
      await queryRunner.query(`INSERT INTO egg_groups (egg_group) VALUES ('Amorphus')`);
      await queryRunner.query(`INSERT INTO egg_groups (egg_group) VALUES ('Field')`);
      await queryRunner.query(`INSERT INTO egg_groups (egg_group) VALUES ('Water 2')`);
      await queryRunner.query(`INSERT INTO egg_groups (egg_group) VALUES ('Fairy')`);
      await queryRunner.query(`INSERT INTO egg_groups (egg_group) VALUES ('Ditto')`);
      await queryRunner.query(`INSERT INTO egg_groups (egg_group) VALUES ('Grass')`);
      await queryRunner.query(`INSERT INTO egg_groups (egg_group) VALUES ('Dragon')`);
      await queryRunner.query(`INSERT INTO egg_groups (egg_group) VALUES ('No Eggs Discovered')`);
      await queryRunner.query(`INSERT INTO egg_groups (egg_group) VALUES ('Gender unknown')`);

      await queryRunner.createForeignKey("pokemons", new TableForeignKey({
        name: "FK_pokemons",
        columnNames: ["egg_group_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "egg_groups",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      }));

      await queryRunner.commitTransaction();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey("pokemons", "FK_pokemons");
      await queryRunner.dropTable("egg_groups");
      await queryRunner.dropColumn("pokemons", "egg_group_id");
    }
}
