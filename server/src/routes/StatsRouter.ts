import express from "express";
import * as statsController from "../controllers/StatsController"

export const statsRouter = express.Router();
statsRouter.use(express.json());

statsRouter.get("/get-stats/:id", statsController.getStats);

statsRouter.put("/update-stats/:id", statsController.updateStats)

export default statsRouter;