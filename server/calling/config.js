const twilio = require('twilio');

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = new twilio.RestClient(accountSid, authToken);

// client.messages.create({
// 	body: 'testing message',
// 	to: '+16505421376',
// 	from: '+16502036183'
// }, function(err, message) {
// 	console.log(err, message.sid);
// })