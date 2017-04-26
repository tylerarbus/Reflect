require('dotenv').config();

if (process.env.IS_ON === 'development') {
  process.env.DATABASE_URL = 'postgres://@localhost:5432/reflectivetest';
}

const { db, loadDb } = require('../../db/config.js');
const Entry = require('../../server/models/entries.js');
const EntryText = require('../../server/models/entry-text.js');
const User = require('../../server/models/users.js');
const Audio = require('../../server/models/audio.js');

const newEntry = {
  entry_id: null,
  user_id: null,
  call_id: '5dsFD351234FDS'
};

const resetDb = () => (
  db.none('TRUNCATE users RESTART IDENTITY CASCADE')
);

beforeAll((done) => {
  return loadDb(db)
    .then(() => {
      return resetDb();
    })
    .then(() => {
      return User.new({
        email: 'terencetmac2@gmail.com',
        first_name: 'Terence',
        last_name: 'Tham',
        password: 'Password',
        phone: '6505421376'
      });
    })
    .then((user) => {
      newEntry.user_id = user.user_id;
      done();
    });
});

afterAll(() => (
  resetDb()
));

describe('Entries', () => {
  it('should add an entry', () => {
    let entry;
    return Entry.new(newEntry)
      .then((result) => {
        entry = result;
        newEntry.entry_id = entry.entry_id;
        expect(result).toBeDefined();
        return EntryText.new(result.entry_id, 'sample text');
      })
      .then(() => {
        Audio.new({
          entry_id: entry.entry_id,
          remote_path: 'remote_path',
          local_path: 'local_path',
          is_processed: false,
          is_downloaded: false,
          recording_id: '12FD2',
          date_file_created: new Date()
        });
      });
  });

  it('should get an entry by call_id', () => {
    return Entry.getByCallId(newEntry.call_id)
      .then((result) => {
        expect(result).toBeDefined();
        expect(result.call_id).toEqual(newEntry.call_id);
      });
  });

  it('should get entries by user_id', () => {
    return Entry.findByUserId(newEntry.user_id)
      .then((result) => {
        expect(result).toBeDefined();
        expect(result[0].user_id).toEqual(newEntry.user_id);
        expect(result[0].local_path).toBeDefined();
      });
  });

  it('should find not processed Entries', () => {
    return Entry.findNotProcessed()
      .then((result) => {
        expect(result).toBeDefined();
        expect(result[0].is_processed).toBe(false);
      });
  });

  it('should update a processed entry', () => {
    return Entry.updateProcessed(newEntry.entry_id)
      .then((result) => {
        expect(result[0].is_processed).toBe(true);
      });
  });

  it('should delete an entry by entry_id', () => {
    return Entry.delete(newEntry.entry_id)
      .then((entry) => {
        expect(entry.entry_id).toEqual(newEntry.entry_id);
      });
  });
});
