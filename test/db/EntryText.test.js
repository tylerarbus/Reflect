require('dotenv').config();

if (process.env.IS_ON === 'development') {
  process.env.DATABASE_URL = 'postgres://@localhost:5432/reflectivetest';
}

const { db, loadDb } = require('../../db/config.js');

beforeAll(() => (
  loadDb(db)
))

describe('EntryText table', () => {
  it('should have an entry_text table', (done) => {
    db.any('SELECT * FROM entry_text')
      .then(() => {
        done();
      })
      .catch((error) => {
        expect(error).toBeUndefined();
        done();
      });
  });
});
