const elasticsearch = require('elasticsearch');

const client = new elasticsearch.Client({
  host: process.env.SEARCH_URL,
  log: 'error'
});

const params = {
  index: 'entries'
};

const verifyIndex = () => {
  client.indices.exists(params)
    .then((exists) => {
      if (!exists) {
        return client.indices.create(params);
      }
    })
    .then(() => {
      console.log('Success creating/verifying entries index in elasticsearch cluster');
    })
    .catch((error) => {
      console.log('Error creating/verifying entries index', error);
    });
};

client.ping({
  requestTimeout: 300000
}, (error) => {
  if (error) {
    console.error('Error connecting to elasticsearch cluster');
  } else {
    console.log('Successfully connected to elasticsearch cluster');
    verifyIndex();
  }
});

module.exports = client;
