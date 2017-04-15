const router = require('express').Router();
const Call = require('./config.js');
const xml = require('xml');
const Auth = require('../auth/utils.js');

router.post('/call', Auth.authMiddleware, (req, res) => {
	Call.call(req.user)
		.then(call_sid => {
			res.status(200).send();
		})
		.catch(err => {
			res.status(500).send('Error making call.');
		});
});

router.post('/called', (req, res) => {
	res.set({
		'Content-Type': 'text/xml'
	});
	res.status(200).send('<Response />');
});

module.exports = router;