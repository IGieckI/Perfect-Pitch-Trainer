import { Request, Response } from 'express';
import { collections } from "../services/DatabaseService";
import Stats from '../models/Stats';
import InfiniteGame from '../models/InfiniteGame';
import SetOfNotesGame from '../models/SetOfNotesGame';

/**
 * Generate mock data inside the database for testing.
 */
export const generateMockData = async (req: Request, res: Response) => {    
    if (!collections.stats || !collections.infinite_games || !collections.set_of_notes_games) {
        res.status(500).send("Database connection not established.");
        return;
    }
    
    try {
        const result = await collections.stats.insertOne(new Stats(-1, 100, 100));
        const result2 = await collections.infinite_games.insertOne(new InfiniteGame(-1, 100, new Date()));
        const result3 = await collections.set_of_notes_games.insertOne(new SetOfNotesGame(-1, 10, 10, 10, new Date()));

        if (result.insertedId && result2.insertedId && result3.insertedId) {
            res.status(201).send("Successfully created mock data.");
        } else {
            res.status(500).send("Failed to create mock data.");
        }
    } catch (error: any) {
        res.status(400).send(`Error creating mock data: ${error.message}`);
    }
};

/**
 * Delete testing mock data inside the database.
 */
export const deleteMockData = async (req: Request, res: Response) => {
    if (!collections.stats || !collections.infinite_games || !collections.set_of_notes_games) {
        res.status(500).send("Database connection not established.");
        return;
    }

    try {        
        const result = await collections.stats.deleteMany(
            { player_id: -1 });

        const result2 = await collections.infinite_games.deleteMany(
            { player_id: -1 });

        const result3 = await collections.set_of_notes_games.deleteMany(
                { player_id: -1 });

        if (result.acknowledged && result2.acknowledged && result3.acknowledged) {
            res.status(201).send("Successfully deleted mock data.");
        } else {
            res.status(500).send("Failed to delete mock data.");
        }
    } catch (error: any) {
        res.status(400).send(`Error deleting mock data: ${error.message}`);
    }
};