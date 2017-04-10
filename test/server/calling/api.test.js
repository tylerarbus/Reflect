// jest.disableAutomock();
// jest.unmock('supertest').unmock('../../../server/server.js');

import request from 'supertest';
import express from 'express';
var app;

describe('Calling API tests', () => {
	beforeEach(() => {
 		app = require('../../../server/server.js');
	});

	afterEach((done) => {
		app.close(done);
	})

	it('should run a test', (done) => {
			return request(app)
			.get('/api/calling/call')
			.end((req, res) => {
				expect(res.statusCode).toBe(201);
				done();
			})
	})
})