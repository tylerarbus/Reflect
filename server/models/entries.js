const { db } = require('../../db/config.js');

module.exports.new = entry => (
  db.one(
    'INSERT INTO entries\
    (user_id, call_id)\
    VALUES (${user_id}, ${call_id})\
    RETURNING entry_id, user_id, call_id, created',
  entry)
);

module.exports.getByCallId = callId => (
  db.oneOrNone('SELECT * FROM entries WHERE call_id = $1', [callId])
);

module.exports.getCallIdByEntryId = entryId => (
  db.oneOrNone('SELECT * FROM entries WHERE entry_id = $1', [entryId])
);

module.exports.findByUserId = userId => (
  db.manyOrNone('SELECT entry_text.text, entries.entry_id, entries.created, entries.user_id, audio.local_path FROM entry_text\
    INNER JOIN entries ON entry_text.entry_id = entries.entry_id\
    INNER JOIN audio ON entry_text.entry_id = audio.entry_id\
    WHERE entries.user_id = $1\
    ORDER BY entries.created DESC', [userId])
);

module.exports.delete = entryId => (
  db.one('DELETE FROM entries WHERE entry_id = $1 RETURNING entry_id', [entryId])
);
