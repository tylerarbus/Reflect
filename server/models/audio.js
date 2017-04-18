const { db } = require('../../db/config.js');

module.exports.new = audio => (
  db.one(
    'INSERT INTO audio\
    (entry_id, remote_path, local_path, is_processed, is_downloaded, recording_id, date_file_created)\
    VALUES (${entry_id}, ${remote_path}, ${local_path}, ${is_processed}, ${is_downloaded}, ${recording_id}, ${date_file_created})\
    RETURNING audio_id',
    audio)
);

module.exports.update = (audioId, column, updatedValue) => (
  db.query('UPDATE audio SET $1~ = $2 WHERE audio_id = $3 RETURNING *', [column, updatedValue, audioId])
);

module.exports.findNotProcessed = () => (
  db.manyOrNone('SELECT * FROM audio WHERE is_processed = $1', [false])
);

module.exports.findNotDownloaded = () => (
  db.manyOrNone('SELECT * FROM audio WHERE is_downloaded = $1', [false])
);

module.exports.updateDownloaded = audio => (
  db.query('UPDATE audio SET (is_downloaded, local_path) = ($1, $2) WHERE entry_id = $3 RETURNING *', [true, audio.local_path, audio.entry_id])
);

module.exports.exists = entryId => (
  db.oneOrNone('SELECT * FROM audio WHERE entry_id = $1', [entryId])
    .then((result) => {
      if (result) {
        return result;
      }
      return false;
    })
);
