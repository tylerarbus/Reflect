const { db } = require('../../db/config.js');

module.exports.new = (entryId, text) => (
  db.one(
    'INSERT INTO entry_text\
    (entry_id, text)\
    VALUES ($1, $2)\
    RETURNING entry_text_id',
    [entryId, text])
);

module.exports.findNotAnalyzed = () => (
  db.any('SELECT * FROM entry_text WHERE is_analyzed = false')
);

module.exports.update = (entryTextId, column, updatedValue) => (
  db.query('UPDATE entry_text SET $1~ = $2 WHERE entry_text_id = $3 RETURNING *', [column, updatedValue, entryTextId])
);
