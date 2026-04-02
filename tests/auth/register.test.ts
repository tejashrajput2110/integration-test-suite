import "reflect-metadata";
import request from "supertest";
import app from "../../src/app";
import { AppDataSource } from "../../src/config/data-source";
import { User } from "../../src/entities/User";
import { setupTestDB } from "../db/setupDb";

setupTestDB();

test("register new user", async () => {
  const email = `register.${Date.now()}@example.com`;

  const response = await request(app).post("/auth/register").send({
    email,
    password: "abc@123",
  });

  expect(response.status).toBe(201);
  expect(response.body.email).toBe(email);

  const user = await AppDataSource.getRepository(User).findOne({ where: { email } });
  expect(user).not.toBeNull();
});

test("register duplicate user", async () => {
  const email = `dup.${Date.now()}@example.com`;

  await request(app).post("/auth/register").send({ email, password: "abc@123" });
  const response = await request(app).post("/auth/register").send({ email, password: "abc@123" });

  expect([400, 409]).toContain(response.status);
});