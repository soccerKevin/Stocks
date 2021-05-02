const express = require('express');
const webpack = require('webpack');
const path = require('path');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const configPath = path.resolve('webpack.config.js');
const webpackConfig = require(configPath);
const compiler = webpack(webpackConfig);

const port = 3000;

console.log()

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
  })
);

const appPage = path.resolve('src/app.js');
app.get('/', (req, res) => {
	res.send('')
});

app.listen(port, function () {
  console.log(`Listening on port ${port}!`);
});