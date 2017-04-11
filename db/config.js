const pgp = require('pg-promise')();
const schema = require('./schema.js');

const url = process.env.DATABASE_URL || 'postgres://@localhost:5432/reflective';

if (process.env.DATABASE_URL) {
  pgp.pg.defaults.ssl = true;
};

const db = pgp(url);

schema(db)
  .then(() => {
    console.log('Success loading db');
  })
  .catch((error) => {
    console.log('Error loading db', error);
  })

module.exports = db;