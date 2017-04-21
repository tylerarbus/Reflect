const cron = require('node-cron');
const Call = require('../calling/config.js');
const Audio = require('../models/audio.js');
const Entry = require('../models/entries.js');
const request = require('request');
const fs = require('fs');

const downloaded = [];

const _hasBeenDownloaded = (call) => {
  const isDownloaded = downloaded.filter(item => (
    item.call_sid === call.call_sid
  ));
  return !!isDownloaded.length > 0;
};

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
      .then(() => {
        console.log('Saved File');
      })
    ));
};

module.exports.getFileDetails = cron.schedule('5 * * * * *', () => {
  console.log('DownloadWorker: getFileDetails running...');
  Call.getRecordings()
    .then((results) => {
      if (results.recordings.length === 0) {
        throw new Error('DW: Get file: no recordings found on server.');
      }
      console.log('DW:GFD Get Recordings: ', results.recordings.length);
      results.recordings.forEach((call) => {
        let entry = null;
        if (_hasBeenDownloaded(call)) {
          return console.log('DW:GFD Call is in download queue, doing nothing.');
        }
        Entry.getByCallId(call.call_sid)
          .then((entryDB) => {
            if (!entryDB) {
              throw new Error('DW: Get Recordings: No Entry found.');
            }
            entry = entryDB;
            console.log('DW:GFD Entry found in table. entry_id: ', entryDB.entry_id);
            return Audio.exists(entryDB.entry_id);
          })
          .then((exists) => {
            if (!exists) {
              console.log('DW:GFD Audio for entry_id does not exist, creating new Audio.');
              return Audio.new({
                entry_id: entry.entry_id,
                remote_path: call.uri,
                local_path: '',
                is_processed: false,
                is_downloaded: false,
                recording_id: call.sid,
                date_file_created: call.dateCreated
              });
            }
            return console.log('DW:GFD Audio for entry_id exists');
          })
          .then(() => {
            downloaded.push(call);
            console.log('DW:GFD Call not not found in download queue, adding.');
          })
          .catch(err => {
            console.error(err);
          });
      });
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
