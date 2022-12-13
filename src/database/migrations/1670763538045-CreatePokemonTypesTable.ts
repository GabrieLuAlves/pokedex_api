import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePokemonTypesTable1670763538045 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: "types",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment"
          },
          {
            name: "type",
            type: "varchar",
            isNullable: false
          },
        ]
      }));

      await queryRunner.query(`INSERT INTO types (type) VALUES ('Normal');`);
      await queryRunner.query(`INSERT INTO types (type) VALUES ('Fighting');`);
      await queryRunner.query(`INSERT INTO types (type) VALUES ('Flying');`);
      await queryRunner.query(`INSERT INTO types (type) VALUES ('Poison');`);
      await queryRunner.query(`INSERT INTO types (type) VALUES ('Ground');`);
      await queryRunner.query(`INSERT INTO types (type) VALUES ('Rock');`);
      await queryRunner.query(`INSERT INTO types (type) VALUES ('Bug');`);
      await queryRunner.query(`INSERT INTO types (type) VALUES ('Ghost');`);
      await queryRunner.query(`INSERT INTO types (type) VALUES ('Steel');`);
      await queryRunner.query(`INSERT INTO types (type) VALUES ('Fire');`);
      await queryRunner.query(`INSERT INTO types (type) VALUES ('Water');`);
      await queryRunner.query(`INSERT INTO types (type) VALUES ('Grass');`);
      await queryRunner.query(`INSERT INTO types (type) VALUES ('Eletric');`);
      await queryRunner.query(`INSERT INTO types (type) VALUES ('Psychic');`);
      await queryRunner.query(`INSERT INTO types (type) VALUES ('Ice');`);
      await queryRunner.query(`INSERT INTO types (type) VALUES ('Dragon');`);
      await queryRunner.query(`INSERT INTO types (type) VALUES ('Dark');`);
      await queryRunner.query(`INSERT INTO types (type) VALUES ('Fairy');`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('types');
    }

}
