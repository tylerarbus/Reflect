const SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
const fs = require('fs');
const path = require('path');


const speech_to_text = new SpeechToTextV1 ({
  username: process.env.SPEECH_USERNAME,
  password: process.env.SPEECH_PASSWORD
});

const params = {
  // From file
  audio: fs.createReadStream(path.resolve(__dirname, 'files/20170412_151158.wav')),
  content_type: 'audio/wav',
  continuous: true
};

speech_to_text.recognize(params, function(err, res) {
  if (err) {
    console.log(err);
  } else {
    let text = '';

    res.results.forEach(function(result) {
      text += result.alternatives[0].transcript + '. ';
    });

    console.log('final result: ', text);
    // save text in DBßß
  }
});



