import dotenv from "dotenv";
dotenv.config();

import "reflect-metadata";
import app from "./app";
import { AppDataSource } from "./config/data-source";

const PORT = 3000;

// ✅ Start server immediately
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

// ✅ Connect DB separately (non-blocking)
AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.error("DB connection failed:", err);
  });