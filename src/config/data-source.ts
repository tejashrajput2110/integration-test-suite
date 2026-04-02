import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Post } from "../entities/Post";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User, Post],
});