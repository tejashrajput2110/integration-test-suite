import { Request, Response } from "express";
import { PostService } from "../services/post.service";
import { AuthRequest } from "../types/auth-request";

const service = new PostService();

export class PostController {
  async create(req: AuthRequest, res: Response) {
    try {
      const user = req.user as { id: number };

      const { title, content } = req.body;

      const post = await service.create(user.id, title, content);

      res.json(post);
    } catch (err: unknown) {
      if (err instanceof Error) {
        res.status(400).json({ message: err.message });
      } else {
        res.status(400).json({ message: "Unknown error" });
      }
    }
  }

  async getAll(req: Request, res: Response) {
    const posts = await service.getAll();

    res.json(posts);
  }

  async getOne(req: Request, res: Response) {
    try {
      const post = await service.getOne(Number(req.params.id));

      res.json(post);
    } catch (err: unknown) {
      if (err instanceof Error) {
        res.status(400).json({ message: err.message });
      } else {
        res.status(400).json({ message: "Unknown error" });
      }
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { title, content } = req.body;

      const post = await service.update(Number(req.params.id), title, content);

      res.json(post);
    } catch (err: unknown) {
      if (err instanceof Error) {
        res.status(400).json({ message: err.message });
      } else {
        res.status(400).json({ message: "Unknown error" });
      }
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await service.delete(Number(req.params.id));

      res.json({ success: true });
    } catch (err: unknown) {
      if (err instanceof Error) {
        res.status(400).json({ message: err.message });
      } else {
        res.status(400).json({ message: "Unknown error" });
      }
    }
  }
}
