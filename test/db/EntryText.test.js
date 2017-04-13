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

  // it('should add a new entry_text into the table', () => {
  //   const newUser = {
  //     email: 'test@example.com',
  //     first_name: 'John',
  //     last_name: 'Smith',
  //     password: 'password',
  //     phone: '123-456-7890'
  //   }    
  //   const audioPath = 'test_path';
  //   const entryText = 'I had a great day today';

  //   let userId = null;
  //   let audioId = null;

  //   // add user to userDB
  //   // add mock audio where userId = 1 from above
  //   // add mock entry where entry ID = above (and maybe user id)
  //   // add add mock entry text with all above

  //   return Users.new(newUser)
  //     .then(userId => {
  //       userId = userId;
  //       return Audio.new(audioPath)
  //     })
  //     .then(audioId => {
  //       audioId = audioId;
  //       return 
  //     })

  // })
})