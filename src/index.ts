import logger from './core/logger';
import { app } from './app';
require('dotenv').config();

const start = async () => {
  app.listen(3000, () => {
    logger.info({
      type: 'system',
      message: 'Server started'
    });

    console.log('Listening on port 3000');
  });
};

start();
