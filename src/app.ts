import express from 'express';
import 'express-async-errors';
import MatchmakingRouter from './features/matchmaking/router/matchmaking-router';
import ProfileRouter from './features/profile/router/profile-router';
import SettingsRouter from './features/settings/router/settings-router';
import { logRequest, logResponse } from './middlewares';

const app = express();
app.use(express.json());

app.use(
  '/matchmaking',
  logRequest,
  logResponse,
  new MatchmakingRouter().setup()
);
app.use('/profile', logRequest, logResponse, new ProfileRouter().setup());

app.use('/settings', logRequest, logResponse, new SettingsRouter().setup());

export { app };
