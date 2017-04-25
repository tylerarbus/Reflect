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

module.exports.findNotIndexed = () => (
  db.any('SELECT entry_text.entry_id, entry_text.entry_text_id, entry_text.text, entries.created, entries.user_id, audio.local_path FROM entry_text\
  INNER JOIN entries ON entry_text.is_indexed = false AND entries.entry_id = entry_text.entry_id\
  INNER JOIN audio ON entries.entry_id = audio.entry_id')
);

module.exports.update = (entryTextId, column, updatedValue) => (
  db.query('UPDATE entry_text SET $1~ = $2 WHERE entry_text_id = $3 RETURNING *', [column, updatedValue, entryTextId])
);
