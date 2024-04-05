import express, { Express } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import history from 'connect-history-api-fallback';
import gamesRouter from './routes/GamesRouter'
import statsRouter from './routes/StatsRouter'
import testsRouter from './routes/TestsRouter'

dotenv.config();
let port: number = Number(process.env.SERVER_PORT);

const app: Express = express();

app.use(bodyParser.json())

app.use('/api/games', gamesRouter);
app.use('/api/stats', statsRouter);
app.use('/tests', testsRouter);

app.use(history())

app.use(function(req, res, next) {
    res.setHeader("Content-Type", "text/plain");
    res.status(404).send("Ops... Page not found!");
})

app.listen(port, function() {
    console.log(`Listening on http://localhost:${port}`);
})

export default app