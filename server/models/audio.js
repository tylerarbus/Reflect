const { db } = require('../../db/config.js');

module.exports.new = (audio) => {
  return db.one(
    'INSERT INTO audio\
    (entry_id, remote_path, local_path, is_processed, is_downloaded, recording_id, date_file_created)\
    VALUES (${entry_id}, ${remote_path}, ${local_path}, ${is_processed}, ${is_downloaded}, ${recording_id}, ${date_file_created})\
    RETURNING audio_id',
    audio)
}

module.exports.update = (audio_id, column, updatedValue) => {
  return db.query('UPDATE audio SET $1~ = $2 WHERE call_id = $3 RETURNING *', [column, updatedValue, audio_id]);
}

module.exports.findNotProcessed = () => {
  return db.manyOrNone('SELECT * FROM audio WHERE is_processed = $1', [false]);
}

module.exports.findNotDownloaded = () => {
	return db.manyOrNone('SELECT * FROM audio WHERE is_downloaded = $1', [false]);
}

module.exports.updateDownloaded = (recording_id) => {
  return db.query('UPDATE audio SET $1~ = $2 WHERE recording_id = $3 RETURNING *', ['is_downloaded', true, recording_id]);
}

module.exports.exists = (entry_id) => {
	return db.oneOrNone('SELECT * FROM audio WHERE entry_id = $1', [entry_id])
		.then(result => {
			if (result) {
				return result;
			} else {
				return false;
			}
		});
}
