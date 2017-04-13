const SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
const fs = require('fs');
const path = require('path');
const EntryText = require('../models/entry-text.js');

const speechToText = new SpeechToTextV1 ({
  username: process.env.SPEECH_USERNAME,
  password: process.env.SPEECH_PASSWORD
});

module.exports.process = (entry_id, filePath) => {
  const params = {
    // TODO: Change file to given filePath
    audio: fs.createReadStream(path.resolve(__dirname, 'files/20170412_151158.wav')),
    content_type: 'audio/wav',
    continuous: true
  };

  speechToText.recognize(params, function(err, res) {
    if (err) {
      console.log(err);
    } else {
      let text = '';

      res.results.forEach(function(result) {
        text += result.alternatives[0].transcript + '. ';
      });

      console.log('final result: ', text);
      EntryText.new(entry_id, text, filePath);
    }
  });
}




