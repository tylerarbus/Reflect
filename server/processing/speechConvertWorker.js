const cron = require('node-cron');
const fs = require('fs');
const path = require('path');
const SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
const Audio = require('../models/audio.js');
const EntryText = require('../models/entry-text.js');

const speechToText = new SpeechToTextV1({
  username: process.env.SPEECH_USERNAME,
  password: process.env.SPEECH_PASSWORD
});

const cronSchedule = '15 * * * * *';

const _createEntryFromText = (watsonResponse) => {
  let entry = '';
  watsonResponse.results.forEach((result) => {
    entry += `${result.alternatives[0].transcript}. `;
  });
  return entry.replace(/%HESITATION/g, '...');
};

const _convertToText = (audioId, filePath, entryId) => {
  const params = {
    audio: fs.createReadStream(path.resolve(__dirname, `files/${filePath}`)),
    content_type: 'audio/wav',
    continuous: true,
    model: 'en-US_NarrowbandModel'
  };

  speechToText.recognize(params, (err, res) => {
    if (err) {
      return console.log(err);
    }
    const entryText = _createEntryFromText(res);
    return EntryText.new(entryId, entryText)
      .then(() => {
        Audio.update(audioId, 'is_processed', true);
      });
  });
};


module.exports = cron.schedule(cronSchedule, () => {
  console.log('Speech Convert Worker: running...');
  Audio.findNotProcessed()
    .then((files) => {
      console.log('SCW: Unprocessed audio files: ', files.length);
      files.forEach((file) => {
        if (file.local_path) {
          _convertToText(file.audio_id, file.local_path, file.entry_id);
        }
      });
    })
    .catch((error) => {
      console.error(error);
    });
}, false);
