const { db } = require('../../db/config.js');

module.exports.getAll = () => {
  return db.any('SELECT * FROM sentiment')
}