import "reflect-metadata";
import request from "supertest";
import app from "../../src/app";
import { getAuthToken } from "../generalFunctions";
import { setupTestDB } from "../db/setupDb";

setupTestDB();

test("get all posts", async () => {
  const token = await getAuthToken(`readall.${Date.now()}@example.com`);

  await request(app).post("/posts").set("Authorization", `Bearer ${token}`).send({ title: "P1", content: "C1" });
  await request(app).post("/posts").set("Authorization", `Bearer ${token}`).send({ title: "P2", content: "C2" });

  const response = await request(app).get("/posts").set("Authorization", `Bearer ${token}`);

  expect(response.status).toBe(200);
  const list = Array.isArray(response.body) ? response.body : response.body?.data;
  expect(Array.isArray(list)).toBe(true);
  expect(list.length).toBeGreaterThanOrEqual(2);
});

test("get post by id and not found", async () => {
  const token = await getAuthToken(`readone.${Date.now()}@example.com`);

  const created = await request(app)
    .post("/posts")
    .set("Authorization", `Bearer ${token}`)
    .send({ title: "One", content: "One content" });

  const postId = created.body?.id ?? created.body?.data?.id;

  const found = await request(app).get(`/posts/${postId}`).set("Authorization", `Bearer ${token}`);
  expect(found.status).toBe(200);

  const missing = await request(app).get("/posts/999999").set("Authorization", `Bearer ${token}`);
  expect([400, 404]).toContain(missing.status);
});