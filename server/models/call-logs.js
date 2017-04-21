const { db } = require('../../db/config.js');

module.exports.new = callLog => (
  db.one(
    'INSERT INTO call_logs\
    (user_id, call_sid, phone, type, status)\
    VALUES (${user_id}, ${call_sid}, ${phone}, ${type}, ${status})\
    RETURNING call_log_id, user_id, call_sid, type, status',
  callLog)
);

module.exports.update = (callSid, status, duration = '') => (
  db.query('UPDATE call_logs SET status = $2, duration = $3 where call_sid = $1', [callSid, status, duration])
);

// Temp: expect many rows to return now, in future only allow 1 call per day per number
module.exports.hasBeenCalledToday = userId => (
  db.manyOrNone('SELECT * from call_logs WHERE user_id = $1 and extract(DAY FROM created) = extract(DAY from now())', [userId])
);
