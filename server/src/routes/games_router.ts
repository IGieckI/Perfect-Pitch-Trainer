// External Dependencies
import express, { Request, Response } from "express";
import { collections } from "../services/database_service";
import Game from "../models/game";

// Global Config
export const gamesRouter = express.Router();

gamesRouter.use(express.json());

// Routes
gamesRouter.get("/get_all_games", async (req: Request, res: Response) => {
    if (!collections.games) {
        res.status(500).send("Database connection not established.");
        return;
    }

    try {
        const gamesData = await collections.games.find().toArray();
        const games = gamesData.map((game: any) => new Game(game.n_turns, game.n_correct, game.accuracy, game._id));

        if (games.length > 0) {
            res.status(200).send(games);
        } else {
            res.status(404).send("No games found.");
        }
    } catch (error: any) {
        res.status(500).send(`Error retrieving games: ${error.message}`);
    }
});

gamesRouter.post("/post_game", async (req: Request, res: Response) => {
    if (!collections.games) {
        res.status(500).send("Database connection not established.");
        return;
    }

    try {
        const newGame = req.body as Game;
        const result = await collections.games.insertOne(newGame);

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