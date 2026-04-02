import "reflect-metadata";
import request from "supertest";
import app from "../../src/app";
import { AppDataSource } from "../../src/config/data-source";
import { Post } from "../../src/entities/Post";
import { getAuthToken } from "../generalFunctions";
import { setupTestDB } from "../db/setupDb";

setupTestDB();

test("delete post success", async () => {
  const token = await getAuthToken(`delete.${Date.now()}@example.com`);

  const created = await request(app)
    .post("/posts")
    .set("Authorization", `Bearer ${token}`)
    .send({ title: "Delete me", content: "content" });

  const postId = created.body?.id ?? created.body?.data?.id;

  const deleted = await request(app).delete(`/posts/${postId}`).set("Authorization", `Bearer ${token}`);
  expect([200, 204]).toContain(deleted.status);

  const found = await AppDataSource.getRepository(Post).findOne({ where: { id: postId }  });
  expect(found).toBeNull();
});

test("delete post not found", async () => {
  const token = await getAuthToken(`deletenf.${Date.now()}@example.com`);
  const response = await request(app).delete("/posts/999999").set("Authorization", `Bearer ${token}`);
  expect([400, 404]).toContain(response.status);
});