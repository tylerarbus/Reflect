require('dotenv').config();
let db = null;
let Audio = null;

beforeAll(() => {
  if (process.env.IS_ON === 'development') {
    process.env.DATABASE_URL = 'postgres://@localhost:5432/reflectivetest';
  }
  Audio = require('../../server/models/audio.js');
  const dbConfig = require('../../db/config.js');
  db = dbConfig.db;
})

afterAll(() => {
  return db.one("DELETE FROM audio WHERE audio_path = 'testPath'");
})

describe('Audio table', () => {

  let audioId = null;

  it('should have an audio table', () => {
    db.any('SELECT * FROM audio')
      .then(result => {
        expect(result).toBeDefined();
      })
  })

  it('should add an audio file to the table', () => {
    const path = 'testPath';

    return Audio.new(path)
      .then(audioId => {
        expect(audioId).toBeDefined();
      })
  })

  it('should find files that have not been processed', () => {
    return Audio.findNotProcessed()
      .then(results => {
        expect(results).toBeDefined();
        expect(results.audio_path).toEqual('testPath');
      })
  })

  it('should update isProcessed property when requested', () => {
    return Audio.findNotProcessed()
      .then(results => {
        const audioId = results.audio_id;
        return Audio.update(audioId, 'isprocessed', true)
          .then(results => {
            const file = results[0];
            expect(file.audio_id).toEqual(audioId);
            expect(file.audio_path).toEqual('testPath');
            expect(file.isprocessed).toEqual(true);
          })
      })
  })

})