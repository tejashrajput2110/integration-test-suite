import express from "express";
import authRoutes from "./routes/auth.routes";
import postRoutes from "./routes/post.routes";

const app = express();

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/posts", postRoutes);
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

export default app;