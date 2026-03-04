import express from "express";
import "./config/env.js";
import { env } from "./config/env.js";
import { connectDB } from "./config/database.js";
import authRouter from "./modules/auth/auth.route.js";
import trackerRouter from "./modules/tracker/tracker.routes.js";
const app = express();
app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/tracker", trackerRouter); 

connectDB()
  .then(() => {
    app.listen(env.port, () => {
      console.log(`running on http://localhost:${env.port}`);
    });
  })
  .catch((error) => {
    console.log("❌ MONGODB connection failed !!!", error);
  });
