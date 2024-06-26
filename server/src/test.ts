import request from 'supertest';
import app from './app';
import { gamesRouter } from './routes/GamesRouter';
import { statsRouter } from './routes/StatsRouter';
import { testsRouter } from './routes/TestsRouter';
import InfiniteGame from './models/InfiniteGame';
import SetOfNotesGame from './models/SetOfNotesGame';
import Stats from './models/Stats';

app.use('/api/games', gamesRouter);
app.use('/api/stats', statsRouter);

describe('Games API tests', () => {

    beforeAll(async () => {
        await request(app).post('/tests/generate-mock-data');
    });

    afterAll(async () => {
        await request(app).post('/tests/delete-mock-data');
    });

    test('POST /api/games/post-set-of-notes-game', async () => {
        const response2 = await request(app)
            .post('/tests/generate-mock-data');
        const newGame = new SetOfNotesGame(-1, -1, -1, -1, new Date());
        const response = await request(app)
            .post('/api/games/post-set-of-notes-game')
            .send(newGame);
        expect(response.statusCode).toBe(201);
    });

    test('POST /api/games/post-infinite-game', async () => {
        const newGame = new InfiniteGame(-1, -1, new Date());
        const response = await request(app)
            .post('/api/games/post-infinite-game')
            .send(newGame);
        expect(response.statusCode).toBe(201);
    });

    test('PUT /api/stats/update-stats/:id', async () => {
        const id = 0;
        const updatedStats = new Stats(id, 10000, 100);
        const response = await request(app)
            .put(`/api/stats/update-stats/${id}`)
            .send(updatedStats);
        expect(response.statusCode).toBe(201);
    });

    test('GET /api/games/get-all-infinite-games/:id', async () => {
        const id = -1;
        const response = await request(app).get(`/api/games/get-all-infinite-games/${id}`); 
        expect(response.statusCode).toBe(200);
    });

    test('GET /api/games/get-all-set-of-notes-games/:id', async () => {
        const id = -1;
        const response = await request(app).get(`/api/games/get-all-set-of-notes-games/${id}`);
        expect(response.statusCode).toBe(200);
    });

    test('GET /api/stats/get-stats/:id', async () => {
        const id = 0;
        const response = await request(app).get(`/api/stats/get-stats/${id}`);
        expect(response.statusCode).toBe(200);
    });

    test('GET /api/games/get-last-infinite-game/:id', async () => {
        const id = -1;
        const response = await request(app).get(`/api/games/get-last-infinite-game/${id}`);
        expect(response.statusCode).toBe(200);
    });
});