import { MigrationInterface, QueryRunner } from "typeorm";
import bcrypt from "bcrypt";
export class DataSeed1773314515577 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const password = await bcrypt.hash("admin123", 10);

    await queryRunner.query(
      `
      INSERT INTO "user" (email, password, role)
      VALUES ($1, $2, $3)
      `,
      ["admin@test.com", password, "admin"],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
      DELETE FROM "user" WHERE email='admin@test.com'
      `,
    );
  }
}
