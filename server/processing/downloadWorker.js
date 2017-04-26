const cron = require('node-cron');
const fs = require('fs');
const Audio = require('../models/audio.js');
const Entry = require('../models/entries.js');
const request = require('request');

const cronSchedule = '10 * * * * *';

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

module.exports = cron.schedule(cronSchedule, () => {
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
