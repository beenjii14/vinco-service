import supertest from 'supertest';
import { app, server } from '../index';

const api = supertest(app);

module.exports = {
  app,
  api,
  server,
};
