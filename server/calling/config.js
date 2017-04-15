const twilio = require('twilio');
const fetch = require('isomorphic-fetch');
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio.RestClient(accountSid, authToken);
const Audio = require('../models/audio.js');

let downloaded = [];

module.exports = {
	call: function(user) {
		// TODO: Extra security: Verify user phone with user id from DB
		return new Promise((resolve, reject) => {
			client.calls.create({
				url: `${process.env.TWILIO_XML_URL}/calls/voice.xml`,
				from: process.env.TWILIO_FROM,
				to: user.phone,
				method: 'GET'
			}, (err, call) => {
				if (err) {
					reject(err);
				} else {
					console.log('Call SID: ', call.sid);
					resolve(call.sid);
				}
			});
		})
	},

	sendVerification: (phone, countryCode = 1) => {

		let config = {
			method: 'POST'
		};

		// TODO: Save user phone number without country code
		// TODO: Get user's phone details from user_id
		let params = buildParams({
			api_key: process.env.AUTHY_KEY,
			via: 'sms',
			phone_number: phone,
			country_code: countryCode
		});

		return fetch(`https://api.authy.com/protected/json/phones/verification/start?${params}`, config)
			.then(response => {
				console.log('Verification sms sent successfully to: ', phone);
			})
			.catch(error => {
				console.log(error);
			});
	},

	verify: (phoneNumber, countryCode, verificationCode) => {

		let config = {
			method: 'GET'
		};

		let params = buildParams({
			api_key: process.env.AUTHY_KEY,
			phone_number: phoneNumber,
			country_code: countryCode,
			verification_code: verificationCode
		});

		return fetch(`https://api.authy.com/protected/json/phones/verification/check?${params}`, config)
			.then(response => {
				if (response.status === 200) {
					return true;
				} else {
					throw new Error('Invalid verification code');
				}
			});
	},

	getRecordings: () => {
		// TODO: Update date created when ready
		// TODO: Download checking by call_sid even though 1 call_sid might have many audios
		const fromDate = new Date();
		const dateCreated = `${fromDate.getFullYear().toString()}-${leftPadTwoDigits(fromDate.getMonth() + 1)}-${leftPadTwoDigits(fromDate.getDate() - 1)}`;
		client.recordings.list({
			'dateCreated>': '2017-04-01',
			'dateCreated<': dateCreated
		}, function(err, data) {
			if (err) { 
				return console.error(err) 
			};

			if (data) {
				data.recordings.forEach(call => {					
					let hasBeenDownloaded = downloaded.filter(item => {
						return item.call_sid === call.call_sid;
					});

					if (hasBeenDownloaded.length === 0) {
						Audio.new({
							call_id: call.call_sid,
							remote_path: call.uri,
							local_path: '',
							is_processed: false,
							is_downloaded: false,
							recording_id: call.sid,
							date_file_created: call.dateCreated
						})
						downloaded.push(call);
						console.log('Download Worker: not found, saved');
					} else {
						// NOTE: if in downloaded, do nothing
						console.log('Download Worker: found, doing nothing');
					}
				});
			}
		});
	}
}

const leftPadTwoDigits = (value) => {
	value = value.toString();
	if (value.length === 1) {
		value = '0' + value;
	}
	return value;
}

const buildParams = (params) => {
	let paramString = '';
	Object.keys(params).forEach((param, index) => {
		paramString += param;
		paramString += '=';
		paramString += params[param];
		if (index !== Object.keys(params).length-1) {
			paramString+= '&';
		}
	});
	return paramString;
}

