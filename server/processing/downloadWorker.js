const cron = require('node-cron');
const Call = require('../calling/config.js');
const Audio = require('../models/audio.js');
const request = require('request');
const fs = require('fs');

let downloaded = [];

module.exports.getFileDetails = cron.schedule('10 * * * * *', () => {
	console.log('DownloadWorker: getFileDetails running...');
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
									console.log('DownloadWorker: getFileDetails: not Found, saved');
								}
							});
					} else {
						// NOTE: if in downloaded, do nothing
						console.log('DownloadWorker: getFileDetails: Found, doing nothing');
					}
				});
			}
		})
		.catch(err => {
			console.error(err);
		});
}, false);

module.exports.downloadFiles = cron.schedule('5 * * * * *', () => {
	console.log('DownloadWorker: downloadFiles running...');

	Audio.findNotDownloaded()
		.then(results => {
			if (results) {
				results.forEach(result => {
					let call_sid = result.recording_id;
					console.log('DW: Request to: ', result.recording_id)
					request(`https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_SID}/Recordings/${result.recording_id}.wav`,
						(error, response, body) => {
							console.log('DW: Response status: ', response.statusCode);
							response.pipe(fs.createWriteStream(`${__dirname}/files/${call_sid}.wav`)
								.on('finish', () => {
									console.log('DW: Trying to save: ', call_sid);
									Audio.updateDownloaded(call_sid);
								})
							);
						})	
				});			
			}
		})		
}, false);

const _hasBeenDownloaded = (call) => {	
	const isDownloaded = downloaded.filter(item => {
		return item.call_sid === call.call_sid;
	});

	return isDownloaded.length > 0 ? true : false;
}
