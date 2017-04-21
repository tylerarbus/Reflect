const pgp = require('pg-promise')();
const schema = require('./schema.js');

const url = process.env.NODE_ENV === 'test' && process.env.IS_ON === 'development' ? 'postgres://@localhost:5432/reflectivetest' : process.env.DATABASE_URL;

if (process.env.IS_ON !== 'development') {
  pgp.pg.defaults.ssl = true;
}

const db = pgp(url);

const loadDb = db => (
  schema(db)
);

if (process.env.NODE_ENV !== 'test') {
  loadDb(db)
    .then(() => {
      console.log('Database successfully loaded.');
    })
    .catch((err) => {
      console.error('Error loading database. ', err);
    });
}

module.exports = { db, loadDb };
