import "reflect-metadata";
import { setupTestDB } from "../db/setupDb";
import { loginUser, registerUser } from "../generalFunctions";

setupTestDB();

test("login success", async () => {
  const email = `login.${Date.now()}@example.com`;
  await registerUser(email, "abc@123");

  const response = await loginUser(email, "abc@123");

  expect(response.status).toBe(200);
  expect(response.body.token ?? response.body.accessToken).toBeDefined();
});

test("login wrong password", async () => {
  const email = `wrongpass.${Date.now()}@example.com`;
  await registerUser(email, "abc@123");

  const response = await loginUser(email, "wrong@123");

  expect([400, 401]).toContain(response.status);
});

test("login non-existing user", async () => {
  const response = await loginUser(`nouser.${Date.now()}@example.com`, "abc@123");
  expect([400, 401, 404]).toContain(response.status);
});