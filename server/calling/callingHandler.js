const router = require('express').Router();
const Call = require('./config.js');
const Auth = require('../auth/utils.js');

router.post('/call', Auth.authMiddleware, (req, res) => {
  Call.call(req.user)
    .then((callSid) => {
      res.status(200).json({
        call_id: callSid
      });
    })
    .catch((err) => {
      console.log('Error: ', err);
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
