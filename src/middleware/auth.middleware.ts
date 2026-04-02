import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../types/auth-request";

export function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {

  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = header.split(" ")[1];

  try {

    const decoded = jwt.verify(token, "secret");

    req.user = decoded;

    next();

  } catch {

    res.status(401).json({ message: "Invalid token" });

  }

}