const elasticsearch = require('elasticsearch');

const client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

client.ping({
  requestTimeout: 30000
}, (error) => {
  if (error) {
    console.error('Error connecting to elasticsearch');
  } else {
    console.log('Successfully connected to elasticsearch');
  }
});

module.exports = client;
