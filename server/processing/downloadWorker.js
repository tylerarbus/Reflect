const cron = require('node-cron');
const Call = require('../calling/config.js');
const Audio = require('../models/audio.js');
let downloaded = [];

module.exports = cron.schedule('10 * * * * *', () => {

	console.log('DownloadWorker running...');
	
	Call.getRecordings()
		.then(results => {
			if (results.recordings) {
				results.recordings.forEach(call => {
					if (!_hasBeenDownloaded(call)) {
						Audio.exists(call.call_sid)
							.then(exists => {
								if (!exists) {
									Audio.new({
										call_id: call.call_sid,
										remote_path: call.uri,
										local_path: '',
										is_processed: false,
										is_downloaded: false,
										recording_id: call.sid,
										date_file_created: call.dateCreated
									});
									downloaded.push(call);
									console.log('Download Worker: not found, saved');
								}
							});
					} else {
						// NOTE: if in downloaded, do nothing
						console.log('Download Worker: found, doing nothing');
					}
				});
			}
		})
		.catch(err => {
			console.error(err);
		});
}, false);

const _hasBeenDownloaded = (call) => {	
	const isDownloaded = downloaded.filter(item => {
		return item.call_sid === call.call_sid;
	});

	return isDownloaded.length > 0 ? true : false;
}
