const dotenv = require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const config = require('../webpack.config.js');
  const compiler = webpack(config);

  app.use(webpackHotMiddleware(compiler));
  app.use(webpackDevMiddleware(compiler, {
    publicPath: '/',
    stats: {
      colors: true,
    },
    hot: true,
    noInfo: true,
  }));
}

app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, '../client/public')));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('listening on port 3000...');
});