const cron = require('node-cron');
const Call = require('../calling/config.js');
const Audio = require('../models/audio.js');
const Entry = require('../models/entries.js');
const request = require('request');
const fs = require('fs');

let downloaded = [];

module.exports.getFileDetails = cron.schedule('10 * * * * *', () => {
	console.log('DownloadWorker: getFileDetails running...');
	Call.getRecordings()
		.then(results => {
			console.log('DW Get Recordings: ', results.recordings.length);
			if (results.recordings) {
				results.recordings.forEach(call => {
					let entry = null;
					if (!_hasBeenDownloaded(call)) {
						console.log('DW has not been downloaded: ', call);
						Entry.getByCallId(call.call_sid)
							.then(entryDB => {
								entry = entryDB;
								console.log('DW Entry found in table.', entryDB);
								return Audio.exists(entryDB.entry_id);
							})
							.then(exists => {
								if (!exists) {
									console.log('DW Audio for entry_id does not exist, creating new Audio.');
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
							})
							.then(() => {
								downloaded.push(call);
								console.log('DownloadWorker: getFileDetails: not Found, saved');
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
					console.log('call_id', call_sid);
					console.log('DW: Request to: ', result.recording_id)
					request(`https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_SID}/Recordings/${result.recording_id}.wav`,
						(error, response, body) => {
							console.log('DW: Response status: ', response.statusCode);
						})
						.pipe(fs.createWriteStream(`${__dirname}/files/${call_sid}.wav`)
								.on('finish', () => {
									Entry.getByCallId(call_sid)
										.then(entry => {
											console.log('DW: Trying to save: ', call_sid);
											return Audio.updateDownloaded(entry.entry_id);
										})
										.then(result => {
											console.log(result)
										})
										.catch(err => {
											console.error(err);
										})
								})
							);
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
