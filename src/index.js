import express from "express";
import './config/env.js'
import { env } from "./config/env.js";
import {connectDB} from "./config/database.js";
const app = express();
app.use(express.json());


connectDB()
  .then(() => {
    app.listen(env.port, () => {
      console.log(`running on http://localhost:${env.port}`);
    });
  })
  .catch((error) => {
    console.log("❌ MONGODB connection failed !!!", error);
  });
