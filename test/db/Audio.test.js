require('dotenv').config();

if (process.env.IS_ON === 'development') {
  process.env.DATABASE_URL = 'postgres://@localhost:5432/reflectivetest';
}

const { db, loadDb } = require('../../db/config.js');
const User = require('../../server/models/users.js');
const Entry = require('../../server/models/entries.js');
const Audio = require('../../server/models/audio.js');

const newEntry = {};

const resetDb = () => (
  db.none('TRUNCATE users RESTART IDENTITY CASCADE')
);

beforeAll(() => {
  return loadDb(db)
    .then(() => (
      User.new({
        email: 'testuser@email.com',
        first_name: 'test',
        last_name: 'user',
        password: 'password',
        phone: '6505421376'
      })
    ))
    .then((user) => (
      Entry.new({
        user_id: user.user_id,
        call_id: 'CAee9eb020ed511d453aee0f8aac8c0f8b'
      })
    ))
    .then((entry) => {
      newEntry.entry_id = entry.entry_id;
    });
});

afterAll(() => (
  resetDb()
));

const newAudio = {
  remote_path: '/2010-04-01/Accounts/AC1ef0d59f0d5d4611c7953f8bc6f660ec/Recordings/RE0448c78482ac9f0805736389cdbea64c.json',
  local_path: '',
  is_processed: false,
  is_downloaded: false,
  recording_id: 'RE0448c78482ac9f0805736389cdbea64c',
  date_file_created: 'Tue, 11 Apr 2017 16:48:38 +0000'
};

describe('Audio table', () => {
  let audioId = null;

  it('should have an audio table', () => {
    db.any('SELECT * FROM audio')
      .then((result) => {
        expect(result).toBeDefined();
      });
  });

  it('should add an audio file to the table', () => {
    newAudio.entry_id = newEntry.entry_id;
    return Audio.new(newAudio)
      .then((audioDB) => {
        expect(audioDB).toBeDefined();
      });
  });

  it('should find files that have not been downloaded', () => {
    return Audio.findNotDownloaded()
      .then((results) => {
        expect(results).toBeDefined();
        expect(results[0].is_downloaded).toEqual(false);
      });
  });

  it('should update file that has been downloaded', () => {
    return Audio.findNotDownloaded()
      .then((audioDB) => {
        const audio = audioDB[0];
        audio.local_path = 'localpath';
        return Audio.updateDownloaded(audio);
      })
      .then((results) => {
        expect(results[0].is_downloaded).toEqual(true);
      });
  });

  it('should find files that have not been processed', () => {
    return Audio.findNotProcessed()
      .then((results) => {
        expect(results).toBeDefined();
        expect(results[0].remote_path).toEqual(newAudio.remote_path);
        expect(results[0].is_processed).toEqual(false);
        expect(results[0].is_downloaded).toEqual(true);
      });
  });

  it('should update is_processed property when requested', () => {
    return Audio.findNotProcessed()
      .then((results) => {
        audioId = results[0].audio_id;
        return Audio.update(audioId, 'is_processed', true);
      })
      .then((results) => {
        const file = results[0];
        expect(file.remote_path).toEqual(newAudio.remote_path);
        expect(file.is_processed).toEqual(true);
      });
  });

  it('should return entry if an entry exists', () => {
    return Audio.exists(newEntry.entry_id)
      .then((results) => {
        expect(results).toBeDefined();
      });
  });

  it('should return false if an entry does not exist', () => {
    return Audio.exists('1234')
      .then((results) => {
        expect(results).toBe(false);
      });
  });
});
