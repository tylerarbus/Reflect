require('dotenv').config();

if (process.env.IS_ON === 'development') {
  process.env.DATABASE_URL = 'postgres://@localhost:5432/reflectivetest';
}
const EntryNLP = require('../../server/models/entryNLP.js');
const Entry = require('../../server/models/entries.js');
const User = require('../../server/models/users.js');

const { db, loadDb } = require('../../db/config.js');

const resetDb = () => (
  db.none('TRUNCATE users RESTART IDENTITY CASCADE')
);

const testUser = {
  email: 'test@example.com',
  first_name: 'John',
  last_name: 'Smith',
  password: 'password',
  phone: '1234567890',
  phone_verified: false
};

const testEntryNLP = {
  keywords: {},
  entities: {},
  sentiment: {
    document: {
      score: 0.5
    }
  },
  emotion: {
    document: {
      emotion: {}
    }
  }
};

beforeAll((done) => (
  loadDb(db)
    .then(() => (
      resetDb()
    ))
    .then(() => (
      User.new(testUser)
    ))
    .then((newUser) => (
      Entry.new({
        call_id: '5dsFD351234FDS',
        user_id: newUser.user_id
      })
    ))
    .then((newEntry) => {
      testEntryNLP.entry_id = newEntry.entry_id;
      done();
    })
));

afterAll(() => (
  resetDb()
));

describe('Entry NLP table', () => {
  it('should have an Entry NLP table', done => (
    db.any('SELECT * FROM entry_nlp')
      .then(() => {
        done();
      })
      .catch((error) => {
        expect(error).toBeUndefined();
        done();
      })
  ));

  it('should create a new entry', () => {
    return EntryNLP.new(testEntryNLP.entry_id, testEntryNLP)
      .then((entryNLP) => {
        expect(entryNLP.entry_nlp_id).toEqual(1);
      })
      .catch((error) => {
        expect(error).toBeUndefined();
      });
  });

  it('should throw an error when adding a new entry without a valid entry id', () => {
    return EntryNLP.new(2, testEntryNLP)
      .then((result) => {
        expect(result).toBeUndefined();
      })
      .catch((error) => {
        expect(error).toBeDefined();
      });
  });

  it('should return all entries associated with a user', () => {
    return EntryNLP.findByUserId(1)
      .then((results) => {
        expect(results).toHaveLength(1);
      });
  });

  it('should delete an entry when an associated user is deleted', () => {
    return db.none('DELETE FROM users WHERE user_id = 1')
      .then(() => {
        return EntryNLP.findByUserId(1)
          .then((results) => {
            expect(results).toHaveLength(0);
          })
          .catch((error) => {
            expect(error).toBeUndefined();
          });
      });
  });
});
