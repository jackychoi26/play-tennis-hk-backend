import TennisMatchesRepository from './features/matchmaking/data/repositories/tennis-matches-repository';
import { app } from './app';

const start = async () => {
  require('dotenv').config();

  console.log(new TennisMatchesRepository().getMatches());

  app.listen(3000, () => {
    console.log('Listening on port 3000');
  });
};

start();
