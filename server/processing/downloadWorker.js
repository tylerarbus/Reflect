const cron = require('node-cron');
const Call = require('../calling/config.js');

module.exports = cron.schedule('10 * * * * *', () => {

	console.log('DownloadWorker running...');
	Call.getRecordings();
}, false);