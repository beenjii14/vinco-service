require('dotenv').config();

const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 3001,
  db: process.env.MONGODB_URI || 'mongodb://localhost:27017/test',
  db_tests: process.env.MONGODB_URI_TEST || 'mongodb://localhost:27017/test',
  secret: process.env.SECRET || '12345',
};

module.exports = config;
