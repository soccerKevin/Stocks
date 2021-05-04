const express = require('express')
const webpack = require('webpack')
const path = require('path')
const webpackDevMiddleware = require('webpack-dev-middleware')

const app = express()
const webpackConfig = require(path.resolve('webpack.config.js'))
const compiler = webpack(webpackConfig)

const config = require(path.resolve('config/index.js'));

const { server: { port } } = config;

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
  })
)

app.get('*', (req, res) => {
  res.sendFile(path.resolve('public/index.html'))
})


app.listen(port, function () {
  console.log(`Listening on port ${port}!`)
})