import { Router } from "express";
import { PostController } from "../controllers/post.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();
const controller = new PostController();

router.post("/", authMiddleware, controller.create);
router.get("/", controller.getAll);
router.get("/:id", controller.getOne);
router.put("/:id", authMiddleware, controller.update);
router.delete("/:id", authMiddleware, controller.delete);

export default router;