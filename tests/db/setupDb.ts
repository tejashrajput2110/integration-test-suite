import { AppDataSource } from "../../src/config/data-source";

export function setupTestDB() {
  beforeAll(async () => {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    await AppDataSource.runMigrations();
  });

  afterEach(async () => {
    const entities = AppDataSource.entityMetadatas;

    for (const entity of entities) {
      const repository = AppDataSource.getRepository(entity.name);
      await repository.query(`TRUNCATE TABLE "${entity.tableName}" RESTART IDENTITY CASCADE`);
    }
  });

  afterAll(async () => {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
  });
}