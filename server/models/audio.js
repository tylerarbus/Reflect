const { db } = require('../../db/config.js');

module.exports.new = (audioPath) => {
  return db.one(
    'INSERT INTO audio\
    (audio_path)\
    VALUES ($1)\
    RETURNING audio_id',
    audioPath)
}

module.exports.update = (audio_id, column, updatedValue) => {
  return db.query('UPDATE audio SET $1~ = $2 WHERE audio_id = $3 RETURNING *', [column, updatedValue, audio_id]);
}

module.exports.findNotProcessed = () => {
  return db.oneOrNone('SELECT * FROM audio WHERE isProcessed = $1', [false]);
}