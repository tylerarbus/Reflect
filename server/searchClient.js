const elasticsearch = require('elasticsearch');

const client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'error'
});

client.ping({
  requestTimeout: 300000
}, (error) => {
  if (error) {
    console.error('Error connecting to elasticsearch');
  } else {
    console.log('Successfully connected to elasticsearch');
  }
});

module.exports = client;
