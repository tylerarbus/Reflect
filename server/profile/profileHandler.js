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

module.exports = router;
