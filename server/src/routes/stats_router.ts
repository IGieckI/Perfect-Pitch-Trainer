// External Dependencies
import express, { Request, Response } from "express";
import { collections } from "../services/database_service";
import Stats from "../models/stats";

// Global Config
export const statsRouter = express.Router();

statsRouter.use(express.json());

// Routes
statsRouter.get("/get_all_games", async (req: Request, res: Response) => {
    try {
        const stats = await collections.stats.findAll() as Stats[];

        if (stats.length > 0) {
            res.status(200).send(stats);
        } else {
            res.status(404).send("No stats found.");
        }
    } catch (error) {
        res.status(500).send(`Error retrieving games: ${error.message}`);
    }
});