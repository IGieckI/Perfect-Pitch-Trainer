import express, { Request, Response } from "express";
import { collections, connectToDatabase } from "../services/DatabaseService";
import InfiniteGame from "../models/InfiniteGame";
import SetOfNotesGame from "../models/SetOfNotesGame";

export const gamesRouter = express.Router();
gamesRouter.use(express.json());

// Ensure connection to the DB
connectToDatabase();

/**
 * Get all infinite games from the database.
 */
gamesRouter.get("/get-all-infinite-games", async (req: Request, res: Response) => {
    if (!collections.infinite_games) {
        res.status(500).send("Database connection not established.");
        return;
    }

    try {
        const gamesData = await collections.infinite_games.find().toArray();

        const games = gamesData.map((game: any) => new InfiniteGame(game.player_id, game.score));

        if (games.length > 0) {
            res.status(200).send(games);
        } else {
            res.status(404).send("No games found.");
        }
    } catch (error: any) {
        res.status(500).send(`Error retrieving games: ${error.message}`);
    }
});

/**
 * Get all set of notes games from the database.
 */
gamesRouter.get("/get-all-set-of-notes-games", async (req: Request, res: Response) => {
    if (!collections.set_of_notes_games) {
        res.status(500).send("Database connection not established.");
        return;
    }

    try {
        const gamesData = await collections.set_of_notes_games.find().toArray();

        const games = gamesData.map((game: any) => new SetOfNotesGame(game.player_id, game.n_turns, game.n_categories, game.n_correct));

        if (games.length > 0) {
            res.status(200).send(games);
        } else {
            res.status(404).send("No games found.");
        }
    } catch (error: any) {
        res.status(500).send(`Error retrieving games: ${error.message}`);
    }
});

/**
 * Create a new set of notes game in the database.
 */
gamesRouter.post("/post-set-of-notes-game", async (req: Request, res: Response) => {
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
});

/**
 * Create a new infinite game in the database.
 */
gamesRouter.post("/post-infinite-game", async (req: Request, res: Response) => {
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
});

export default gamesRouter;