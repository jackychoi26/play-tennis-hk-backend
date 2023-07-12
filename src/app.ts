import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { MatchDetailRouter } from './features/matchmaking/router/matchmaking-router';

const app = express();

app.use('/matchmaking', new MatchDetailRouter().setup());
app.use(json());

export { app };
