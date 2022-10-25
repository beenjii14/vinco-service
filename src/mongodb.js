import mongoose from 'mongoose';
import config from '../config';
import { Logger } from './utils/';

const dbConnection = config.dev ? config.db_tests : config.db;

(async () => {
  try {
    await mongoose.connect(dbConnection, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    Logger.info('Connected to MongoDB 💾');
  } catch (error) {
    Logger.error('Error connecting to MongoDB', error.message);
  }
})();
