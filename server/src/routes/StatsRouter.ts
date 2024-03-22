import express from "express";
import * as statsController from "../controllers/StatsController"

export const statsRouter = express.Router();
statsRouter.use(express.json());

statsRouter.get("/:id", statsController.getStats);

export default statsRouter;