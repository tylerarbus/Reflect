const { db } = require('../../db/config.js');

module.exports.new = (audioPath) => {
  return db.one(
    'INSERT INTO audio\
    (audio_path)\
    VALUES ($1)\
    RETURNING audio_id',
    audioPath)
}

