const Entries = require('./models/entries.js');
const EntryNLP = require('./models/entryNLP.js');
const searchClient = require('./searchClient.js');

module.exports.getEntries = (req, res) => {
  Entries.findByUserId(req.user.user_id)
  .then((results) => {
    res.status(200).json({
      entries: results
    });
  })
  .catch((error) => {
    console.error(error);
    res.status(400).send({
      error
    });
  });
};

module.exports.deleteEntries = (req, res) => {
  Entries.delete(req.params.entry_id)
    .then((entry) => {
      res.status(200).json({
        entry_id: entry.entry_id
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(400).send({
        error
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
    });
};

module.exports.search = (req, res) => {
  return searchClient.search({
    index: 'entries',
    body: {
      query: {
        bool: {
          must: [{
            match: {
              text: req.body.query
            }
          },
          {
            match: {
              user_id: req.user.user_id
            }
          }]
        }
      }
    }
  })
    .then(({ hits }) => {
      res.status(200).json(hits);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).end();
    });
};
