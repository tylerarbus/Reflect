const cron = require('node-cron');
const Call = require('../calling/config.js');
const Audio = require('../models/audio.js');
const Entry = require('../models/entries.js');
const request = require('request');
const fs = require('fs');

let downloaded = [];

module.exports.getFileDetails = cron.schedule('5 * * * * *', () => {
	console.log('DownloadWorker: getFileDetails running...');
	Call.getRecordings()
		.then(results => {
			console.log('DW:GFD Get Recordings: ', results.recordings.length);
			if (results.recordings) {
				results.recordings.forEach(call => {
					let entry = null;
					if (!_hasBeenDownloaded(call)) {
						console.log('DW:GFD has not been downloaded: call_id: ', call.call_sid);
						Entry.getByCallId(call.call_sid)
							.then(entryDB => {
								entry = entryDB;
								console.log('DW:GFD Entry found in table. entry_id: ', entryDB.entry_id);
								return Audio.exists(entryDB.entry_id);
							})
							.then(exists => {
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
							})
							.then(() => {
								downloaded.push(call);
								console.log('DW:GFD Call not not found in download queue, adding.');
							});
			
					} else {
						// NOTE: if in downloaded, do nothing
						console.log('DW:GFD Call is in download queue, doing nothing.');
					}
				});
			}
		})
		.catch(err => {
			console.error(err);
		});
}, false);

module.exports.downloadFiles = cron.schedule('10 * * * * *', () => {
	console.log('DownloadWorker: downloadFiles running...');

// TODO: Major refactor when time permits.
	Audio.findNotDownloaded()
		.then(results => {
			console.log('DW:DF List of undownloaded files: ', results.length)
			if (results) {
				results.forEach(result => {
					let audioToDownload = result;
					Entry.getCallIdByEntryId(audioToDownload.entry_id)
						.then(entry => {
							let entry_id = entry.entry_id;
							let call_id = entry.call_id;
							console.log('DW:DF Request to: ', audioToDownload.recording_id);
							// NOTE: Twilio needs the recording_id (sid) to download the file
							request(`https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_SID}/Recordings/${result.recording_id}.wav`,
								(error, response, body) => {
									console.log('DW:DF Response status: ', response.statusCode);
								})
								.pipe(fs.createWriteStream(`${__dirname}/files/${call_id}.wav`)
										.on('finish', () => {
											return Audio.updateDownloaded({
												local_path: `${call_id}.wav`,
												entry_id: entry_id
											})
												.then(() => {
													console.log('Saved File')
												});
										})
									);
						})
				});			
			} else {
				console.log('DW:DF No undownloaded files found.');
			}
		})		
}, false);

const _hasBeenDownloaded = (call) => {	
	const isDownloaded = downloaded.filter(item => {
		return item.call_sid === call.call_sid;
	});

	return isDownloaded.length > 0 ? true : false;
}
