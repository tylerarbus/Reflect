const { db } = require('../../db/config.js');

module.exports.new = (entryId, text) => (
  db.one(
    'INSERT INTO entry_text\
    (entry_id, text)\
    VALUES ($1, $2)\
    RETURNING entry_text_id',
    [entryId, text])
);
