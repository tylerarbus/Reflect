const cron = require('node-cron');
const Entry = require('../models/entries.js');
const Call = require('../calling/config.js');
const Audio = require('../models/audio.js');

module.exports = cron.schedule('5 * * * * *', () => {
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
