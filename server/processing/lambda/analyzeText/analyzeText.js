const request = require('request-promise-native');
const pgp = require('pg-promise')();

pgp.pg.defaults.ssl = true;
const cn = `postgres://${process.env.DB_LOGIN}:${process.env.DB_PASS}@${process.env.DB_URL}`;
const db = pgp(cn);

const Model = {
  EntryText: {
    findNotAnalyzed: () => (
      db.any('SELECT * FROM entry_text WHERE is_analyzed = false')
    ),
    update: entryTextId => (
      db.query('UPDATE entry_text SET is_analyzed = true WHERE entry_text_id = $1 RETURNING *', [entryTextId])
    )
  },
  EntryNlp: {
    new: (entryId, entry) => {
      const newEntry = {
        entryId,
        keywords: JSON.stringify(entry.keywords),
        entities: JSON.stringify(entry.entities),
        sentiment: entry.sentiment.document.score,
        emotions: JSON.stringify(entry.emotion.document.emotion)
      };
      return db.one('INSERT INTO entry_nlp (entry_id, keywords, entities, sentiment, emotions) VALUES (${entryId}, ${keywords}, ${entities}, ${sentiment}, ${emotions}) RETURNING entry_nlp_id', newEntry);
    }
  }
};

const sendToAPI = (text) => {
  const watsonRequestBody = {
    text,
    features: {
      categories: {},
      emotion: {},
      entities: {},
      keywords: {},
      sentiment: {}
    },
    clean: false
  };

  const options = {
    method: 'POST',
    headers: {
      'X-Watson-Learning-Opt-Out': true
    },
    uri: 'https://gateway.watsonplatform.net/natural-language-understanding/api/v1/analyze/?version=2017-02-27',
    auth: {
      username: process.env.SENTIMENT_USERNAME,
      password: process.env.SENTIMENT_PASSWORD
    },
    body: watsonRequestBody,
    json: true
  };

  return request(options);
};

const analyze = entry => (
  sendToAPI(entry.text)
    .then(response => (
      Model.EntryNlp.new(entry.entry_id, response)
    ))
    .then(() => (
      Model.EntryText.update(entry.entry_text_id, 'is_analyzed', true)
    ))
);

exports.myHandler = (event, context, callback) => {
  Model.EntryText.findNotAnalyzed()
    .then(entries => (
      Promise.all(entries.map(entry => (
        analyze(entry)
      )))
    ))
    .then(() => {
      pgp.end();
      callback(null, 'Success analyzing entries');
    })
    .catch((error) => {
      pgp.end();
      console.log('Error analyzing entries', error);
      callback(error, null);
    });
};
