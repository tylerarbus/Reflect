require('dotenv').config();

if (process.env.IS_ON === 'development') {
  process.env.DATABASE_URL = 'postgres://@localhost:5432/reflectivetest';
}

const dbConfig = require('../db/config.js');

const db = dbConfig.db;
dbConfig.loadDb(db);
