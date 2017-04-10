const router = require('express').Router();

router.get('/call', (req, res) => {
	res.status(201).send();
});

module.exports = router;