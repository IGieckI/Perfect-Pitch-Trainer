import express, { Express } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import history from 'connect-history-api-fallback';
import gameRouter from './routes/games_router'
import statsRouter from './routes/stats_router'

dotenv.config();
let port: number = Number(process.env.SERVER_PORT);

const app: Express = express();

app.use(bodyParser.json())

app.use(gameRouter)
app.use(statsRouter)

app.use(history())

app.use(function(req, res, next) {
    res.setHeader("Content-Type", "text/plain");
    res.status(404).send("Ops... Page not found!");
})

app.listen(port, function() {
    console.log(`Listening on http://localhost:${port}`);
})