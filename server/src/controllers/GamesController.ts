import { Request, Response } from 'express';
import { collections } from "../services/DatabaseService";
import InfiniteGame from "../models/InfiniteGame";
import SetOfNotesGame from "../models/SetOfNotesGame";

/**
 * Get all infinite games of a player from the database.
 */
export const getAllInfiniteGames = async (req: Request, res: Response) => {
    if (!collections.infinite_games) {
        res.status(500).send("Database connection not established.");
        return;
    }
    
    const playerId: number = parseInt(req.params.id);

    try {
        const gamesData = await collections.infinite_games.find({ player_id: playerId }).toArray();

        const games = gamesData.map((game: any) => new InfiniteGame(game.player_id, game.score));

        if (games.length > 0) {
            res.status(200).send(games);
        } else {
            res.status(404).send("No games found.");
        }
    } catch (error: any) {
        res.status(500).send(`Error retrieving games: ${error.message}`);
    }
};

/**
 * Get all set of notes games of a player from the database.
 */
export const getAllSetOfNotesGames = async (req: Request, res: Response) => {
    if (!collections.set_of_notes_games) {
        res.status(500).send("Database connection not established.");
        return;
    }
    
    const playerId: number = parseInt(req.params.id);

    try {
        const gamesData = await collections.set_of_notes_games.find({ player_id: playerId }).toArray();

        const games = gamesData.map((game: any) => new SetOfNotesGame(game.player_id, game.n_turns, game.n_categories, game.n_correct));

        if (games.length > 0) {
            res.status(200).send(games);
        } else {
            res.status(404).send("No games found.");
        }
    } catch (error: any) {
        res.status(500).send(`Error retrieving games: ${error.message}`);
    }
};

/**
 * Get the last infinite game of a player.
 */
export const getLastInfiniteGame = async (req: Request, res: Response) => {
    if (!collections.infinite_games) {
        res.status(500).send("Database connection not established.");
        return;
    }
    
    const playerId: number = parseInt(req.params.id);

    try {
        const lastGameData = await collections.infinite_games.findOne(
            { player_id: playerId },
            { sort: { $natural: -1 } }
        );

        if (lastGameData) {
            const lastGame = new InfiniteGame(lastGameData.player_id, lastGameData.score);
            res.status(200).send(lastGame);
        } else {
            res.status(404).send("No game found.");
        }
    } catch (error: any) {
        res.status(500).send(`Error retrieving game: ${error.message}`);
    }
};

/**
 * Create a new set of notes game in the database.
 */
export const postSetOfNotesGame = async (req: Request, res: Response) => {
    if (!collections.set_of_notes_games) {
        res.status(500).send("Database connection not established.");
        return;
    }

    try {
        const newGame = req.body as SetOfNotesGame;
        const result = await collections.set_of_notes_games.insertOne(newGame);

        if (result.insertedId) {
            res.status(201).send(`Successfully created a new game with id ${result.insertedId}`);
        } else {
            res.status(500).send("Failed to create a new game.");
        }
    } catch (error: any) {
        res.status(400).send(`Error creating game: ${error.message}`);
    }
};

/**
 * Create a new infinite game in the database.
 */
export const postInfiniteGame = async (req: Request, res: Response) => {
    if (!collections.infinite_games) {
        res.status(500).send("Database connection not established.");
        return;
    }

    try {
        const newGame = req.body as InfiniteGame;
        const result = await collections.infinite_games.insertOne(newGame);

        if (result.insertedId) {
            res.status(201).send(`Successfully created a new game with id ${result.insertedId}`);
        } else {
            res.status(500).send("Failed to create a new game.");
        }
    } catch (error: any) {
        res.status(400).send(`Error creating game: ${error.message}`);
    }
};