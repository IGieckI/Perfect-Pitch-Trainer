// External Dependencies
import express, { Request, Response } from "express";
import { collections } from "../services/database_service";
import Stats from "../models/stats";

// Global Config
export const statsRouter = express.Router();

statsRouter.use(express.json());

/**
 * Get all stats from the database.
 */
statsRouter.get("/get_all_stats", async (req: Request, res: Response) => {
    if (!collections.stats) {
        res.status(500).send("Database connection not established.");
        return;
    }

    try {
        const statsData = await collections.stats.find().toArray();
        const stats = statsData.map((stat: any) => new Stats(stat.max_infinite_level, stat.average_infinite_accuracy, stat._id));

        if (stats.length > 0) {
            res.status(200).send(stats);
        } else {
            res.status(404).send("No stats found.");
        }
    } catch (error: any) {
        res.status(500).send(`Error retrieving games: ${error.message}`);
    }
});

export default statsRouter;