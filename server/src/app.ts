import express, { Express } from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import history from 'connect-history-api-fallback';
import gameRouter from './routes/games_router'
import statsRouter from './routes/stats_router'

const app: Express = express();

app.use(bodyParser.json())

// Not sure the load works like this
app.use(express.static(path.join(__dirname, '../../client/src')));

app.use(gameRouter)
app.use(statsRouter)

app.use(history())

app.use(function(req, res, next) {
    res.setHeader("Content-Type", "text/plain");
    res.status(404).send("Ops... Page not found!");
})

app.listen(process.env.SERVER_PORT, function() {
    console.log(`Listening on http://localhost:${process.env.SERVER_PORT}`);
})