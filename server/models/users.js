const { db } = require('../../db/config.js');

module.exports.addUser = (user) => {
  return db.one(
    'INSERT INTO users\
    (email, first_name, last_name, password, phone, salt)\
    VALUES (${email}, ${first_name}, ${last_name}, ${password}, ${phone}, ${salt})\
    RETURNING user_id',
    user)
}

module.exports.find = (email) => {
  return db.oneOrNone('SELECT * FROM users WHERE email = $1', [email])
}