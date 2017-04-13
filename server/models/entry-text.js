const { db } = require('../../db/config.js');

module.exports.insert = (entry_id, text) => {
  return db.one(
    'INSERT INTO entry_text\
    (entry_id, text)\
    VALUES ($1, $2)\
    RETURNING entry_text_id',
    [entry_id, text])
};