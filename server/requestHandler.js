const Entries = require('./models/entries.js');
const EntryNLP = require('./models/entryNLP.js');

module.exports.getEntries = (req, res) => {
  Entries.findByUserId(req.user.user_id)
  .then((results) => {
    res.status(200).json({
      entries: results
    }).end();
  })
  .catch((error) => {
    console.error(error);
    res.status(400).send({
      error: err
    });
  });
};

module.exports.getNLP = (req, res) => {
  EntryNLP.findByUserId(req.user.user_id)
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).end();
    })
}
