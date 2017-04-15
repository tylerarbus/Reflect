const router = require('express').Router();
const Sentiment = require('../models/sentiment.js');

router.get('/data', (req, res) => {
  Sentiment.getAll()
    .then(results => {
      res.status(200).json(results).end();
    })
    .catch(error => {
      res.status(500).end();
    })
})

module.exports = router;