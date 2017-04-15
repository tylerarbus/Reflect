require('dotenv').config();
let db = null;
let EntryText = null;
let Users = null;
let Audio = null;
let Entries = null;

beforeAll(() => {
  if (process.env.IS_ON === 'development') {
    process.env.DATABASE_URL = 'postgres://@localhost:5432/reflectivetest';
  }
  EntryText = require('../../server/models/entry-text.js');
  const dbConfig = require('../../db/config.js');
  db = dbConfig.db;
})

afterAll(() => {
 //TODO: delete anything added during tests
})

describe('EntryText table', () => {

  it('should have an entry_text table', (done) => {
    db.any('SELECT * FROM entry_text')
      .then(result => {
        done();
      })
  })

//TODO: write more tests when DB schemas are set
})