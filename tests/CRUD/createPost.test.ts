import "reflect-metadata";
import request from "supertest";
import app from "../../src/app";
import { AppDataSource } from "../../src/config/data-source";
import { Post } from "../../src/entities/Post";
import { getAuthToken } from "../generalFunctions";
import { setupTestDB } from "../db/setupDb";

setupTestDB();

test("create post success", async () => {
  const token = await getAuthToken(`create.${Date.now()}@example.com`);
  const response = await request(app)
    .post("/posts")
    .set("Authorization", `Bearer ${token}`)
    .send({ title: "First Post", content: "Post content" });

  expect([200, 201]).toContain(response.status);

  const postId = response.body?.id ?? response.body?.data?.id;
  expect(postId).toBeDefined();

  const saved = await AppDataSource.getRepository(Post).findOne({ where: { id: postId }  });
  expect(saved).not.toBeNull();
});

test("create post unauthorized", async () => {
  const response = await request(app).post("/posts").send({ title: "x", content: "y" });
  expect([401, 403]).toContain(response.status);
});

test("create post invalid payload", async () => {
  const token = await getAuthToken(`invalid.${Date.now()}@example.com`);
  const repo = AppDataSource.getRepository(Post);
  const before = await repo.count();

  const response = await request(app)
    .post("/posts")
    .set("Authorization", `Bearer ${token}`)
    .send({ title: "" });

  expect([400, 422]).toContain(response.status);

  const after = await repo.count();
  expect(after).toBe(before);
});