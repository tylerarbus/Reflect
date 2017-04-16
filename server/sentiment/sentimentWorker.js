const request = require('request-promise-native');
const cron = require('node-cron');

module.exports = cron.schedule('* * * * * *', () => {

  //fetch text and entry ID from the entry_text database that have processed === false

  //call the watson api to get keywords and sentiment


  //save results in the sentiment table

}, false);
 
const sentimentCall = (text) => {

  const watsonRequestBody = {
    "text": text,
    "features": {
      "sentiment": {},
      "entities": {
        "emotion": false,
        "sentiment": false,
        "limit": 5
      },
      "keywords": {
        "emotion": false,
        "sentiment": false,
        "limit": 5
      }
    },
    "clean": false
  }

  const options = {
    method: 'POST',
    headers: {
      "X-Watson-Learning-Opt-Out": true
    },
    uri: 'https://gateway.watsonplatform.net/natural-language-understanding/api/v1/analyze/?version=2017-02-27',
    auth: {
      username: process.env.SENTIMENT_USERNAME,
      password: process.env.SENTIMENT_PASSWORD
    },
    body: watsonRequestBody,
    json: true
  };

  request(options)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
}

//sentimentCall();

