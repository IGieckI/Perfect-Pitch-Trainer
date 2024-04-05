import express from "express";
import * as GamesController from "../controllers/GamesController"

export const gamesRouter = express.Router();
gamesRouter.use(express.json());

gamesRouter.get("/get-all-infinite-games/:id", GamesController.getAllInfiniteGames);
gamesRouter.get("/get-all-set-of-notes-games/:id", GamesController.getAllSetOfNotesGames);
gamesRouter.get("/get-last-infinite-game/:id", GamesController.getLastInfiniteGame);

gamesRouter.post("/post-set-of-notes-game", GamesController.postSetOfNotesGame);
gamesRouter.post("/post-infinite-game", GamesController.postInfiniteGame);

export default gamesRouter;