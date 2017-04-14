let db = null;
let EntryText = null;
let Users = null;
let Audio = null;
let Entries = null;

beforeAll(() => {
  process.env.NODE_ENV = 'test';
  //process.env.DATABASE_URL = 'postgres://@localhost:5432/reflectivetest';
  EntryText = require('../../server/models/entry-text.js');
  Users = require('../../server/models/users.js');
  Audio = require('../../server/models/audio.js');
  Entries = require('../../server/models/entries.js');
  const dbConfig = require('../../db/config.js');
  db = dbConfig.db;
  return dbConfig.loadDb(db);
})

afterAll(() => {
  delete process.env.NODE_ENV;
  //delete process.env.DATABASE_URL;
  // TODO: delete anything you add to DB during test
  return db.one("DELETE from entry_text WHERE entry_id = 1");
})

describe('EntryText table', () => {

  it('should have an entry_text table', (done) => {
    db.any('SELECT * FROM entry_text')
      .then(result => {
        done();
      })
      .catch(error => {
        throw error;
      })
  })

//TODO: write more tests when DB schemas are confirmed
})