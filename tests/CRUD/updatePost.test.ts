import "reflect-metadata";
import request from "supertest";
import app from "../../src/app";
import { AppDataSource } from "../../src/config/data-source";
import { Post } from "../../src/entities/Post";
import { getAuthToken } from "../generalFunctions";
import { setupTestDB } from "../db/setupDb";

setupTestDB();

test("update post success", async () => {
  const token = await getAuthToken(`update.${Date.now()}@example.com`);

  const created = await request(app)
    .post("/posts")
    .set("Authorization", `Bearer ${token}`)
    .send({ title: "Old", content: "Old content" });

  const postId = created.body?.id ?? created.body?.data?.id;

  const updated = await request(app)
    .put(`/posts/${postId}`)
    .set("Authorization", `Bearer ${token}`)
    .send({ title: "New", content: "New content" });

  expect([200, 204]).toContain(updated.status);

  const saved = await AppDataSource.getRepository(Post).findOne({ where: { id: postId }  });
  expect((saved )?.title).toBe("New");
});

test("update post not found", async () => {
  const token = await getAuthToken(`updatenf.${Date.now()}@example.com`);

  const response = await request(app)
    .put("/posts/999999")
    .set("Authorization", `Bearer ${token}`)
    .send({ title: "x", content: "y" });

  expect([400, 404]).toContain(response.status);
});