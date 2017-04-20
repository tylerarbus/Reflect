require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const dev = require('./dev.js');

const requestHandler = require('./requestHandler.js');
const callingHandler = require('./calling/callingHandler.js');
const authHandler = require('./auth/authHandler.js');
const Auth = require('./auth/utils.js');

const Queue = require('./queue.js');
const speechConvertWorker = require('./processing/speechConvertWorker.js');
const downloadWorker = require('./processing/downloadWorker.js');
<<<<<<< HEAD
const nlpWorker = require('./processing/nlpWorker.js');
=======
const scheduledCallsWorker = require('./processing/scheduledCallsWorker.js');
>>>>>>> Add Scheduled Calls feature.

const app = express();

if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
  dev.webpack(app);
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, '../client/public')));
app.use('/calls', express.static(path.join(__dirname, '/calling/files')));

app.get('/queue', (req, res) => {
  Queue.clearQueue();
});

app.use('/api/calling', callingHandler);
app.use('/api/auth', authHandler);

app.get('/entries', Auth.authMiddleware, requestHandler.getEntries);
app.get('/nlp', Auth.authMiddleware, requestHandler.getNLP);

app.get('*', (req, res) => {
  res.redirect('/');
});

const port = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`listening on port ${port}...`);
  });
}

<<<<<<< HEAD
speechConvertWorker.start();
downloadWorker.getFileDetails.start();
downloadWorker.downloadFiles.start();
nlpWorker.start();
=======
// speechConvertWorker.start();
// downloadWorker.getFileDetails.start();
// downloadWorker.downloadFiles.start();
scheduledCallsWorker.start();
>>>>>>> Add Scheduled Calls feature.

module.exports = { app };
