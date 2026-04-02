import "reflect-metadata";
import request from "supertest";
import app from "../src/app";
import { AppDataSource } from "../src/config/data-source";

beforeAll(async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
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

test("register new user", async () => {
  const response = await request(app).post("/auth/register").send({
    email: "qqqqqqqqqqqqqqq@fbdhbfhdbhfbdhbfhd.com",
    password: "abc@123",
  });
  console.log(response.body);
  expect(response.status).toBe(201);
  expect(response.body.email).toBe("qqqqqqqqqqqqqqq@fbdhbfhdbhfbdhbfhd.com");
});
