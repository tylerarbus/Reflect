const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const app = express();

app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, '../client/public')));

app.listen(3000, () => {
  console.log('listening on port 3000...');
});