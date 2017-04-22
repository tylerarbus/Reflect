const cron = require('node-cron');
const Call = require('../calling/config.js');
const Audio = require('../models/audio.js');
const Entry = require('../models/entries.js');
const request = require('request');
const fs = require('fs');

const _downloadFile = (recordingId, callId, entryId) => {
  console.log('DW:download - downloading...', recordingId);
  request(`https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_SID}/Recordings/${recordingId}.wav`,
    (error, response, body) => {
      console.log('DW:download - Response status: ', response.statusCode);
    })
    .pipe(fs.createWriteStream(`${__dirname}/files/${callId}.wav`))
    .on('finish', () => (
      Audio.updateDownloaded({
        local_path: `${callId}.wav`,
        entry_id: entryId
      })
    ));
};

module.exports.getFileDetails = cron.schedule('5 * * * * *', () => {
  console.log('DownloadWorker: getFileDetails running...');

  Entry.findNotProcessed()
    .then((results) => {
      if (!results) {
        throw new Error('No unprocessed Entries.');
      }
      return Call.getRecordings();
    })
    .then((calls) => {
      if (calls.recordings.length === 0) {
        throw new Error('DW: Get file: no recordings found on server.');
      }
      calls.recordings.forEach(recording => (
        Entry.getByCallId(recording.call_sid)
          .then((entry) => {
            if (!entry) {
              throw new Error('No entry found.');
            }
            return Audio.new({
              entry_id: entry.entry_id,
              remote_path: recording.uri,
              local_path: '',
              is_processed: false,
              is_downloaded: false,
              recording_id: recording.sid,
              date_file_created: recording.dateCreated
            });
          })
          .then((audio) => {
            if (audio) {
              return Entry.updateProcessed(audio.entry_id);
            }
          })
          .catch((err) => {
            console.log(err);
          })
      ));
    })
    .catch((err) => {
      console.error(err);
    });
}, false);

module.exports.downloadFiles = cron.schedule('10 * * * * *', () => {
  console.log('DownloadWorker: downloadFiles running...');
  Audio.findNotDownloaded()
    .then((results) => {
      if (!results) {
        throw new Error('DW:download - No undownloaded files found.');
      }
      console.log('DW:DF List of undownloaded files: ', results.length);
      results.forEach((result) => {
        const audioToDownload = result;
        Entry.getCallIdByEntryId(audioToDownload.entry_id)
          .then((entry) => {
            const entryId = entry.entry_id;
            const callId = entry.call_id;
            _downloadFile(result.recording_id, callId, entryId);
          });
      });
    });
}, false);
