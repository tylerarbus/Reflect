const router = require('express').Router();
const Call = require('./config.js');
const Auth = require('../auth/utils.js');
const CallLog = require('../models/call-logs.js');
const q = require('../queue.js');

router.post('/call', Auth.authMiddleware, (req, res) => {
  const user = req.user;

  const callUser = new Promise((resolve, reject) => {
    q.activeCount('scheduled_call', (err, total) => {
      if (total > 0) {
        q.create('scheduled_call', {
          user_id: user.user_id,
          phone: user.phone,
          call_pref: null,
          type: 'initiated_call'
        }).priority('critical').removeOnComplete(true).save((error) => {
          if (error) {
            reject(error);
          } else {
            console.log('scheduled');
            resolve('Success');
          }
        });
      } else {
        return Call.call(req.user);
      }
    });
  });
  callUser.then((callSid) => {
    res.status(200).json({
      call_id: callSid || ''
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

router.post('/callstatus', (req, res) => {
  const { CallSid, CallStatus, CallDuration } = req.body;
  CallLog.update(CallSid, CallStatus, CallDuration)
    .then(() => {
      res.status(200).send('<Response />');
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(err);
    });
});

module.exports = router;
