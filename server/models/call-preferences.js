const { db } = require('../../db/config.js');

module.exports.new = (userId, timeOfDay) => (
  db.one('INSERT INTO call_preferences\
    (user_id, time_of_day)\
    VALUES ($1, $2)\
    RETURNING *',
    [userId, timeOfDay])
);

module.exports.getAllByHour = (hour, min) => (
  db.manyOrNone('SELECT * FROM call_preferences WHERE (left(time_of_day, 2) = $1 and right(time_of_day, 2) = $2)', [hour, min])
);
