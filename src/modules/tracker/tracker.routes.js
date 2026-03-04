import express, { Router } from "express";
import { getProblem, logProblem } from "./tracker.controller.js";
import authMiddleware from "../../middleware/auth.middleware.js";
const trackerRouter = express.Router();

trackerRouter.post("/log-problem", authMiddleware, logProblem);
trackerRouter.get("/:id", authMiddleware, getProblem);
export default trackerRouter;
