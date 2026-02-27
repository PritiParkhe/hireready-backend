import express from "express";
import "./config/env.js";
import { env } from "./config/env.js";
import { connectDB } from "./config/database.js";
import authRouter from "./modules/auth/auth.route.js";
const app = express();
app.use(express.json());

app.use("/api/v1/auth", authRouter);

connectDB()
  .then(() => {
    app.listen(env.port, () => {
      console.log(`running on http://localhost:${env.port}`);
    });
  })
  .catch((error) => {
    console.log("❌ MONGODB connection failed !!!", error);
  });
