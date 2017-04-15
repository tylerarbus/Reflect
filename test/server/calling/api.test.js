const request = require('supertest');
const app = require('../../../server/server.js').app;
const Call = require('../../../server/calling/config.js');
const recordingSample = { 
	sid: 'RE0448c78482ac9f0805736389cdbea64c',
	account_sid: 'AC1ef0d59f0d5d4611c7953f8bc6f660ec',
	call_sid: 'CAee9eb020ed511d453aee0f8aac8c0f8b',
	duration: '2',
	date_created: 'Tue, 11 Apr 2017 16:48:38 +0000',
	api_version: '2010-04-01',
	date_updated: 'Tue, 11 Apr 2017 16:48:42 +0000',
	status: 'completed',
	source: 'RecordVerb',
	channels: 1,
	price: '-0.00250',
	price_unit: 'USD',
	uri: '/2010-04-01/Accounts/AC1ef0d59f0d5d4611c7953f8bc6f660ec/Recordings/RE0448c78482ac9f0805736389cdbea64c.json',
	accountSid: 'AC1ef0d59f0d5d4611c7953f8bc6f660ec',
	callSid: 'CAee9eb020ed511d453aee0f8aac8c0f8b',
	dateCreated: '2017-04-11T16:48:38.000Z',
	apiVersion: '2010-04-01',
	dateUpdated: '2017-04-11T16:48:42.000Z',
	priceUnit: 'USD' 
}
describe('Calling API tests', () => {

	it('/api/calling/call should respond to a POST request.', (done) => {
		return request(app).post('/api/calling/call')
			.expect(200)
			.then(() => {
				done();
			});
	});

	it('/api/calling/called should respond to a POST request for Twilio', (done) => {
		return request(app).post('/api/calling/called')
			.expect(200)
			.then((res) => {
				expect(res.header['content-type']).toEqual('text/xml; charset=utf-8');
				done();
			});
	});

	xit('should get recordings', () => {
		// Call.getRecordings();
	});
});