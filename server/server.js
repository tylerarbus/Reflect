var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')

var app = express();

app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, '../client/public')));

app.listen(3000, function() {
  console.log('listening on port 3000...');
});