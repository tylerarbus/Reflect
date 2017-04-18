const Entries = require('./models/entries.js');

const getEntries = (req, res) => {
  Entries.findByUserId(1)
  .then((results) => {
    res.status(200).send({
      entries: results
    });
  })
  .catch((err) => {
    console.err(err);
    res.status(400).send({
      error: err
    });
  });
};

module.exports.getEntries = getEntries;
