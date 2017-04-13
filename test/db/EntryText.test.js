let db = null;
let EntryText = null;

beforeAll(() => {
  process.env.NODE_ENV = 'test';
  //process.env.DATABASE_URL = 'postgres://@localhost:5432/reflectivetest';
  EntryText = require('../../server/models/entry-text.js');
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

  it('should add a new entry_text into the table', () => {
    const entryText = {
      entry_id: 1,
      text: 'I had a great day today.'
    }
    return EntryText.insert(entryText)
      .then(entryTextId => {
        expect(entryTextId).toBeDefined();
      });
  })
})