const { db } = require('../../db/config.js');

module.exports.new = user => (
  db.one(
    'INSERT INTO users\
    (email, first_name, last_name, password, phone)\
    VALUES (${email}, ${first_name}, ${last_name}, ${password}, ${phone})\
    RETURNING user_id, email, first_name, last_name, phone, phone_verified',
    user)
);

module.exports.verifyPhone = userId => (
  module.exports.update(userId, 'phone_verified', true)
);

module.exports.findByEmail = email => (
  db.oneOrNone('SELECT * FROM users WHERE email = $1', [email])
);

module.exports.findByPhone = phone => (
  db.oneOrNone('SELECT * FROM users WHERE phone = $1', [phone])
);

module.exports.update = (userId, column, updatedValue) => (
  db.query('UPDATE users SET $1~ = $2 WHERE user_id = $3 RETURNING *', [column, updatedValue, userId])
);

module.exports.delete = userId => (
  db.query('DELETE FROM users WHERE user_id = $1', [userId])
);
