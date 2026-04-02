import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserTable1773313941016 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "user",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "email",
            type: "varchar",
            isUnique: true,
          },
          {
            name: "password",
            type: "varchar",
          },
          {
            name: "role",
            type: "varchar",
            default: "'user'",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("user");
  }
}
