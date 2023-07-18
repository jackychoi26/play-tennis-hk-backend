import express from 'express';
import 'express-async-errors';
import MatchmakingRouter from './features/matchmaking/router/matchmaking-router';
import { ProfileRouter } from './features/profile/router/profile-router';

const app = express();
app.use(express.json());

app.use('/matchmaking', new MatchmakingRouter().setup());
app.use('/profile', new ProfileRouter().setup());

export { app };
