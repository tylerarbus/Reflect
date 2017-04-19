const request = require('request-promise-native');
const cron = require('node-cron');
const EntryText = require('../models/entry-text.js');
const EntryNLP = require('../models/entryNLP.js');

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
      EntryNLP.new(entry.entry_id, response)
    ))
    .then(() => (
      EntryText.update(entry.entry_text_id, 'is_analyzed', true)
    ))
);

module.exports = cron.schedule('20 * * * * *', () => {
  EntryText.findNotAnalyzed()
    .then(entries => (
      Promise.all(entries.map(entry => (
        analyze(entry)
      )))
    ))
    .then(() => {
      console.log('Success analyzing entries');
    })
    .catch((error) => {
      console.log('Error analyzing entries', error);
    });
}, false);
