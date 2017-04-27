const pgp = require('pg-promise')();
const request = require('request');
const AWS = require('aws-sdk');

pgp.pg.defaults.ssl = true;
const cn = `postgres://${process.env.DB_LOGIN}:${process.env.DB_PASS}@${process.env.DB_URL}`;
const db = pgp(cn);

const Model = {
  Entry: {
    findNotProcessed: () => (
      db.manyOrNone('SELECT * FROM entries WHERE is_processed = false')
    ),

    getByCallId: callId => (
      db.oneOrNone('SELECT * FROM entries WHERE call_id = $1', [callId])
    ),
    updateProcessed: entryId => (
      db.query('UPDATE entries SET is_processed = true WHERE entry_id = $1 RETURNING *', [entryId])
    )
  },
  Call: {
    getRecordings: () => (
      new Promise((resolve, reject) => {
        request({
          url: `https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_SID}/Recordings.json`,
          method: 'GET',
          auth: {
            user: process.env.TWILIO_SID,
            pass: process.env.TWILIO_AUTH_TOKEN
          },
          qs: {
            'dateCreated>': '2017-04-15',
            'dateCreated<': '2017-04-24'
          }
        }, (error, response, body) => {
          if (error) {
            reject(error);
          }
          if (response.statusCode === 200) {
            resolve(body);
          }
        });
      })
    )
  },
  Audio: {
    new: audio => (
      db.one(
        'INSERT INTO audio (entry_id, remote_path, local_path, is_processed, is_downloaded, recording_id, date_file_created) VALUES (${entry_id}, ${remote_path}, ${local_path}, ${is_processed}, ${is_downloaded}, ${recording_id}, ${date_file_created}) ON CONFLICT (recording_id) DO NOTHING RETURNING audio_id, entry_id',
        audio)
    )
  }
};

exports.myHandler = (event, context, callback) => {
  Model.Entry.findNotProcessed()
    .then((results) => {
      if (!results) {
        throw new Error('No unprocessed Entries.');
      }
      return Model.Call.getRecordings();
    })
    .then((calls) => {
      const callRecordings = JSON.parse(calls).recordings;
      if (callRecordings.length === 0) {
        throw new Error('No recordings found on server.');
      }
      return Promise.all(callRecordings.map(recording => (
        Model.Entry.getByCallId(recording.call_sid)
          .then((entry) => {
            if (entry) {
              return Model.Audio.new({
                entry_id: entry.entry_id,
                remote_path: recording.uri,
                local_path: '',
                is_processed: false,
                is_downloaded: false,
                recording_id: recording.sid,
                date_file_created: recording.date_created
              });
            }
          })
          .then((audio) => {
            if (audio) {
              return Model.Entry.updateProcessed(audio.entry_id);
            }
          })
          .catch((error) => {
            console.error(error);
          })
      )));
    })
    .then(() => {
      pgp.end();
      const sns = new AWS.SNS();
      const params = {
        Message: 'New files from Twilio',
        Subject: 'New Files',
        TopicArn: 'arn:aws:sns:us-west-1:319272982868:entry_is_processed'
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
