import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";
import { hashPassword } from "../utils/hash";

async function seed() {

  await AppDataSource.initialize();

  const repo = AppDataSource.getRepository(User);

  const user = repo.create({
    email: "test@test.com",
    password: await hashPassword("password"),
    role: "admin",
  });

  await repo.save(user);

  console.log("Seed complete");

}

seed();