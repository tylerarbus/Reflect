const SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
const aws = require('aws-sdk');
const pgp = require('pg-promise')();

pgp.pg.defaults.ssl = true;
const cn = `postgres://${process.env.DB_LOGIN}:${process.env.DB_PASS}@${process.env.DB_URL}`;
const db = pgp(cn);

const speechToText = new SpeechToTextV1({
  username: process.env.SPEECH_USERNAME,
  password: process.env.SPEECH_PASSWORD
});

const bucket = 'elasticbeanstalk-us-west-1-319272982868';
const bucketRegion = 'us-west-1';

const s3 = new aws.S3({
  apiVersion: '2006-03-01',
  params: { Bucket: bucketRegion }
});

const Model = {
  Audio: {
    findNotProcessed: () => (
      db.manyOrNone('SELECT * FROM audio WHERE is_processed = false AND is_downloaded = true')
    ),
    updateProcessed: audioId => (
      db.query('UPDATE audio SET is_processed = true WHERE audio_id = $1 RETURNING *', [audioId])
    )
  },
  EntryText: {
    new: (entryId, text) => (
      db.one('INSERT INTO entry_text (entry_id, text) VALUES ($1, $2) RETURNING entry_text_id', [entryId, text])
    )
  }
};

const _createEntryFromText = (watsonResponse) => {
  let entry = '';
  watsonResponse.results.forEach((result) => {
    entry += `${result.alternatives[0].transcript}. `;
  });
  return entry.replace(/%HESITATION/g, '...');
};

const _convertToText = (audioId, filePath, entryId) => {
  const s3Params = {
    Bucket: bucket,
    Key: `audio/${filePath.split('audio/')[1]}`
  };

  const params = {
    audio: s3.getObject(s3Params).createReadStream(),
    content_type: 'audio/wav',
    continuous: true,
    model: 'en-US_NarrowbandModel'
  };

  return new Promise((resolve, reject) => {
    speechToText.recognize(params, (err, res) => {
      if (err) {
        // not catching error here to prevent outer promise.all from failing
        return console.log(err);
      }
      const entryText = _createEntryFromText(res);
      Model.EntryText.new(entryId, entryText)
        .then(() => {
          return Model.Audio.updateProcessed(audioId);
        })
        .then(() => {
          resolve('Done processing and updating Audio table.');
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
};

exports.myHandler = (event, context, callback) => {
  Model.Audio.findNotProcessed()
    .then((files) => {
      if (!files) {
        throw new Error('No unprocessed audio files');
      }
      return Promise.all(files.map((file) => {
        if (file.local_path) {
          return _convertToText(file.audio_id, file.local_path, file.entry_id);
        }
      }));
    })
    .then(() => {
      pgp.end();
      callback(null, 'done');
    })
    .catch((error) => {
      pgp.end();
      console.error(error);
      callback(error, null);
    });
};
