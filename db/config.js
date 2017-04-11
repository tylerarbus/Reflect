const pgp = require('pg-promise')();
const schema = require('./schema.js');

const url = 'postgres://fxfnmczpnmrlby:c73f1ad4380825fbda4e6e23a315bb248b718c42cb4449ba2c1714430264980d@ec2-23-23-225-12.compute-1.amazonaws.com:5432/dbtu8fljhml504'

//if (process.env.DATABASE_URL) {
  pgp.pg.defaults.ssl = true;
//};

const db = pgp(url);

schema(db)
  .then(() => {
    console.log('Success loading db');
  })
  .catch((error) => {
    console.log('Error loading db', error);
  })

module.exports = db;