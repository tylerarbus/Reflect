const router = require('express').Router();
const CallPrefs = require('../models/call-preferences.js');

router.post('/callpreferences', (req, res) => {
  const { userId, timeOfDay } = req.body;
  CallPrefs.new(userId, timeOfDay)
    .then(() => {
      res.status(200).send();
    })
    .catch((err) => {
      console.log('Error: ', err);
      res.status(400).json({
        error: 'Error adding phone prefs.'
        //emojar
      });
    });
});

router.put('/callpreferences', (req, res) => {
  const { userId, timeOfDay } = req.body;
  CallPrefs.update(userId, timeOfDay)
    .then(() => {
      res.status(200).send();
    })
    .catch((err) => {
      res.status(400).json({
        error: 'Error updating phone prefs.'
      });
    });
});

module.exports = router;
