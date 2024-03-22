import express, { Request, Response } from "express";
import { collections } from "../services/DatabaseService";
import Stats from "../models/Stats";

export const statsRouter = express.Router();
statsRouter.use(express.json());

/**
 * Get stats for a specific player from the database.
 */
statsRouter.get("/:id", async (req: Request, res: Response) => {
    if (!collections.stats) {
        res.status(500).send("Database connection not established.");
        return;
    }

    const playerId: number = parseInt(req.params.id);

    try {
        const stat = await collections.stats.findOne({ player_id: playerId });

        if (stat) {
            const playerStat = new Stats(stat.player_id, stat.best_score_infinite, stat.average_infinite_accuracy);
            res.status(200).send(playerStat);
        } else {
            res.status(404).send("No stats found for this player.");
        }
    } catch (error: any) {
        res.status(500).send(`Error retrieving stats: ${error.message}`);
    }
});

export default statsRouter;