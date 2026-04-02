import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";
import { hashPassword, comparePassword } from "../utils/hash";
import jwt from "jsonwebtoken";


export class AuthService {
  
  async register(email: string, password: string) {
    const userRepo = AppDataSource.getRepository(User);

    const existing = await userRepo.findOne({ where: { email } });

    if (existing) {
      throw new Error("User already exists");
    }

    const hashed = await hashPassword(password);

    const user = userRepo.create({
      email,
      password: hashed,
    });

    await userRepo.save(user);

    return user;
  }

  async login(email: string, password: string) {
    const userRepo = AppDataSource.getRepository(User);

    const user = await userRepo.findOne({ where: { email } });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const valid = await comparePassword(password, user.password);

    if (!valid) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      "secret",
      { expiresIn: "1h" }
    );

    return token;
  }
}