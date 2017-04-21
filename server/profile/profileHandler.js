const router = require('express').Router();
const Prefs = require('../models/call-preferences.js');

router.post('/callpreferences', (req, res) => {
  const { userId, timeOfDay } = req.body;
  Prefs.new(userId, timeOfDay)
    .then(() => {
      res.status(200).send();
    })
    .catch((err) => {
      console.log('Error: ', err);
      res.status(400).json({
        error: 'Error adding phone prefs.'
      });
    });
});

router.put('/callpreferences', (req, res) => {
  const { userId, timeOfDay } = req.body;
  Prefs.update(userId, timeOfDay)
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
