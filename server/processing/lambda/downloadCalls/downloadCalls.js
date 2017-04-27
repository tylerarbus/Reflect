const pgp = require('pg-promise')();
const AWS = require('aws-sdk');
const http = require('https');

pgp.pg.defaults.ssl = true;
const cn = `postgres://${process.env.DB_LOGIN}:${process.env.DB_PASS}@${process.env.DB_URL}`;
const db = pgp(cn);

const audioBucketName = 'elasticbeanstalk-us-west-1-319272982868';
const bucketRegion = 'us-west-1';

AWS.config.update({
  region: bucketRegion
});

const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: { Bucket: bucketRegion }
});


const Model = {
  Audio: {
    findNotDownloaded: () => (
      db.manyOrNone('SELECT * FROM audio WHERE is_downloaded = false')
    ),
    updateDownloaded: audio => (
      db.query('UPDATE audio SET (is_downloaded, local_path) = ($1, $2) WHERE entry_id = $3 RETURNING *', [true, audio.local_path, audio.entry_id])
    )
  },
  Entry: {
    getCallIdByEntryId: entryId => (
      db.oneOrNone('SELECT * FROM entries WHERE entry_id = $1', [entryId])
    )
  }
};

const _downloadFile = (recordingId, callId, entryId) => (
  new Promise((resolve, reject) => {
    http.get(`https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_SID}/Recordings/${recordingId}.wav`,
      (res) => {
        const params = {
          Bucket: audioBucketName,
          Key: `audio/${recordingId}.wav`,
          Body: res
        };
        s3.upload(params, (err, data) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            console.log('data:', data);
            return Model.Audio.updateDownloaded({
              local_path: data.Location,
              entry_id: entryId
            })
            .then(() => {
              resolve(data);
            });
          }
        });
      });
  })
);

exports.myHandler = (event, context, callback) => {
  Model.Audio.findNotDownloaded()
    .then((results) => {
      if (!results) {
        throw new Error('No undownloaded files found.');
      }
      return Promise.all(results.map((result) => {
        const audioToDownload = result;
        return Model.Entry.getCallIdByEntryId(audioToDownload.entry_id)
          .then((entry) => {
            const entryId = entry.entry_id;
            const callId = entry.call_id;
            return _downloadFile(result.recording_id, callId, entryId);
          });
      }));
    })
    .then(() => {
      pgp.end();
      const sns = new AWS.SNS();
      const params = {
        Message: 'New files downloaded onto S3',
        Subject: 'New files on S3',
        TopicArn: 'arn:aws:sns:us-west-1:319272982868:audio_is_downloaded'
      }
      sns.publish(params, (err, data) => {
        callback(null, 'done'); 
      });
    })
    .catch((error) => {
      pgp.end();
      console.error(error);
      callback(error, null);
    });
};
