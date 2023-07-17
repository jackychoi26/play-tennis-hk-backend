import TennisMatchRepository from './features/matchmaking/data/repositories/tennis-match-repository';
import { app } from './app';

const start = async () => {
  require('dotenv').config();

  app.listen(3000, () => {
    console.log('Listening on port 3000');
  });
};

start();
