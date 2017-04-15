const { db } = require('../../db/config.js');

module.exports.new = (audio) => {
  return db.one(
    'INSERT INTO audio\
    (call_id, remote_path, local_path, is_processed, is_downloaded, recording_id, date_file_created)\
    VALUES (${call_id}, ${remote_path}, ${local_path}, ${is_processed}, ${is_downloaded}, ${recording_id}, ${date_file_created})\
    RETURNING audio_id',
    audio)
}

module.exports.update = (audio_id, column, updatedValue) => {
  return db.query('UPDATE audio SET $1~ = $2 WHERE audio_id = $3 RETURNING *', [column, updatedValue, audio_id]);
}

module.exports.findNotProcessed = () => {
  return db.oneOrNone('SELECT * FROM audio WHERE is_processed = $1', [false]);
}

module.exports.exists = (call_id) => {
	return db.oneOrNone('SELECT * FROM audio WHERE call_id = $1', [call_id])
		.then(result => {
			if (result) {
				return true;
			} else {
				return false;
			}
		});
}
