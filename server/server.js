const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const app = express();

app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, '../client/public')));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('listening on port 3000...');
});