const router = require('express').Router();
const Auth = require('./auth/utils.js');
const Entries = require('./models/entries.js');

const getEntries = (req, res) => {
  const userId = req.user.user_id;
  
  Entries.findByUserId(1) 
  .then(results => {
    res.status(200).send({
      entries: results
    })
  })
  .catch(err => {
    console.err(err);
    res.status(400).send({
      error: err
    })
  })
}

module.exports.getEntries = getEntries;