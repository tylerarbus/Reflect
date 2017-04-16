const { db } = require('../../db/config.js');

module.exports.new = (entry) => {
	return db.one(
		'INSERT INTO entries\
		(user_id, call_id)\
		VALUES (${user_id}, ${call_id})\
		RETURNING entry_id, user_id, call_id, created',
	entry)
}

module.exports.getByCallId = (call_id) => {
	return db.oneOrNone('SELECT * FROM entries WHERE call_id = $1', [call_id]);
}