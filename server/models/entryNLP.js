const { db } = require('../../db/config.js');

module.exports.new = (entryId, entry) => {
  const newEntry = {
    entryId,
    keywords: JSON.stringify(entry.keywords),
    entities: JSON.stringify(entry.entities),
    sentiment: entry.sentiment.document.score,
    emotions: JSON.stringify(entry.emotion.document.emotion)
  };
  return db.one(
    'INSERT INTO entry_nlp\
    (entry_id, keywords, entities, sentiment, emotions)\
    VALUES (${entryId}, ${keywords}, ${entities}, ${sentiment}, ${emotions})\
    RETURNING entry_nlp_id',
    newEntry);
};

module.exports.findByUserId = userId => (
  db.manyOrNone('SELECT * FROM entry_nlp INNER JOIN entries\
    ON entries.user_id = $1 AND entries.entry_id = entry_nlp.entry_id',
    [userId])
);
