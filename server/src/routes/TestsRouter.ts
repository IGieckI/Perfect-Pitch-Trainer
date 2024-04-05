import express from "express";
import * as testsController from "../controllers/TestsController"

export const testsRouter = express.Router();
testsRouter.use(express.json());

testsRouter.post("/generate-mock-data", testsController.generateMockData);
testsRouter.post("/delete-mock-data", testsController.deleteMockData);

export default testsRouter;