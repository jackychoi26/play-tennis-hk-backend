import express from 'express';
import 'express-async-errors';
import { MatchDetailRouter } from './features/matchmaking/router/matchmaking-router';
import { ProfileRouter } from './features/profile/router/profile-router';

const app = express();
app.use(express.json());

app.use('/matchmaking', new MatchDetailRouter().setup());
app.use('/profile', new ProfileRouter().setup());

export { app };
