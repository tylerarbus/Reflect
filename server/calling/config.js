const twilio = require('twilio');
const fetch = require('isomorphic-fetch');
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio.RestClient(accountSid, authToken);

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
		let params = _buildParams({
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

		let params = _buildParams({
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
		const dateCreated = `${fromDate.getFullYear().toString()}-${_leftPadTwoDigits(fromDate.getMonth() + 1)}-${_leftPadTwoDigits(fromDate.getDate() - 1)}`;
		
		return new Promise((resolve, reject) => {
			client.recordings.list({
				'dateCreated>': '2017-04-01',
				'dateCreated<': dateCreated
			}, function(err, data) {
					if (err) {
						reject(err);
					}
					if (data) {
						resolve(data);
					}
				});
			});
	}
}

const _leftPadTwoDigits = (value) => {
	value = value.toString();
	if (value.length === 1) {
		value = '0' + value;
	}
	return value;
}

const _buildParams = (params) => {
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
