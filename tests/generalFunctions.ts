import request from "supertest";
import app from "../src/app";

export async function registerUser(email: string, password = "abc@123") {
  return request(app).post("/auth/register").send({ email, password });
}

export async function loginUser(email: string, password = "abc@123") {
  return request(app).post("/auth/login").send({ email, password });
}

export async function getAuthToken(email: string, password = "abc@123") {
  await registerUser(email, password);
  const res = await loginUser(email, password);
  return res.body?.token ?? res.body?.accessToken;
}