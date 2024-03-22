import express from "express";
import * as GamesController from "../controllers/GamesController"

export const gamesRouter = express.Router();
gamesRouter.use(express.json());

gamesRouter.get("/get-all-infinite-games", GamesController.getAllInfiniteGames);

gamesRouter.get("/get-all-set-of-notes-games", GamesController.getAllSetOfNotesGames);

gamesRouter.post("/post-set-of-notes-game", GamesController.postSetOfNotesGame);

gamesRouter.post("/post-infinite-game", GamesController.postInfiniteGame);

export default gamesRouter;