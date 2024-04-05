import { Request, Response } from 'express';
import { collections } from "../services/DatabaseService";
import Stats from '../models/Stats';

/**
 * Get stats for a specific player from the database.
 */
export const getStats = async (req: Request, res: Response) => {
    if (!collections.stats) {
        res.status(500).send("Database connection not established.");
        return;
    }

    const playerId: number = parseInt(req.params.id);

    try {
        const stat = await collections.stats.findOne({ player_id: playerId });

        if (stat) {
            const playerStat = new Stats(stat.player_id, stat.best_score_infinite, stat.average_accuracy_set_of_notes);
            res.status(200).send(playerStat);
        } else {
            res.status(404).send("No stats found for this player.");
        }
    } catch (error: any) {
        res.status(500).send(`Error retrieving stats: ${error.message}`);
    }
};

/**
 * Update the stats on a given id player.
 */
export const updateStats = async (req: Request, res: Response) => {
    if (!collections.stats) {
        res.status(500).send("Database connection not established.");
        return;
    }

    try {
        const updatedStats = req.body as Stats;
        const playerId: number = parseInt(req.params.id);
        
        const result = await collections.stats.updateOne(
            { player_id: playerId },
            { $set: { best_score_infinite: updatedStats.best_score_infinite, average_accuracy_set_of_notes: updatedStats.average_accuracy_set_of_notes } }
        );

        if (result.acknowledged) {
            res.status(201).send(`Successfully updated stats`);
        } else {
            res.status(500).send("Failed to update stats.");
        }
    } catch (error: any) {
        res.status(400).send(`Error updating stats: ${error.message}`);
    }
};