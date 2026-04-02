import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

const service = new AuthService();

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await service.register(email, password);

      res.status(201).json(user);
    } catch (err: unknown) {
      if (err instanceof Error) {
        res.status(400).json({ message: err.message });
      } else {
        res.status(400).json({ message: "Unknown error" });
      }
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const token = await service.login(email, password);

      res.json({ token });
    } catch (err: unknown) {
      if (err instanceof Error) {
        res.status(400).json({ message: err.message });
      } else {
        res.status(400).json({ message: "Unknown error" });
      }
    }
  }
}
