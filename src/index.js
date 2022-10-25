import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import config from '../config';
import './mongodb';
import routes from './routes';
import { Logger } from './utils/';

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

routes(app);

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

const server = app.listen(config.port, () => {
  Logger.info(`🚀 Server running on port ${config.port}`);
});

module.exports = { app, server };
