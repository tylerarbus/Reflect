require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const dev = require('./dev.js');

const requestHandler = require('./requestHandler.js');
const callingHandler = require('./calling/callingHandler.js');
const authHandler = require('./auth/authHandler.js');
const profileHandler = require('./profile/profileHandler.js');

const Auth = require('./auth/utils.js');

const Queue = require('./queue.js');
const DevWorkers = require('./processing/workers.js');
const scheduledCallsWorker = require('./processing/scheduledCallsWorker.js');
const searchWorker = require('./processing/searchWorker.js');

const app = express();

if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
  dev.webpack(app);
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, '../client/public')));
app.use('/calls', express.static(path.join(__dirname, '/calling/files')));
app.use('/audio', express.static(path.join(__dirname, '/processing/files')));

app.get('/queue', (req, res) => {
  Queue.clearQueue();
});

app.use('/api/calling', callingHandler);
app.use('/api/auth', authHandler);
app.use('/api/profile', profileHandler);
app.get('/nlp', Auth.authMiddleware, requestHandler.getNLP);

app.get('/entries', Auth.authMiddleware, requestHandler.getEntries);
app.delete('/entries/:entry_id', Auth.authMiddleware, requestHandler.deleteEntries);
app.post('/search', Auth.authMiddleware, requestHandler.search);

app.get('*', (req, res) => {
  res.redirect('/');
});

const port = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`listening on port ${port}...`);
  });
}

/**
 * Workers for development environments. Uncomment to kick start workers.
 * On production, workers run on AWS lambda.
 */
// DevWorkers.start();

/**
 * Workers for production. Uncomment to start.
 */
// scheduledCallsWorker.start();
searchWorker.start();

module.exports = { app };
