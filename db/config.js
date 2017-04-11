const pgp = require('pg-promise')();
const schema = require('./schema.js');

const url = process.env.DATABASE_URL || 'postgres://@localhost:5432/reflective'

const db = pgp(url);

schema(db)
  .then(() => {
    console.log('Success loading db');
  })
  .catch((error) => {
    console.log('Error loading db', error);
  })

module.exports = db;