const dotenv = require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const dev = require('./dev.js');

const app = express();

if (process.env.NODE_ENV !== 'production') {
  dev.webpack(app);
}

app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, '../client/public')));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('listening on port 3000...');
});