import Debug from 'debug'
import express from 'express'
import webpack from 'webpack'
import path from 'path'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackConfig from 'stocks/webpack.config.js'
import config from 'stocks/config/index'
import apiRouter from './api/router'

const debug = Debug('stocks')
const app = express()
const compiler = webpack(webpackConfig)

const { server: { port } } = config

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
  })
)

app.use('/api/', apiRouter)

app.get('*', (req, res) => {
  res.sendFile(path.resolve('public/index.html'))
})


app.listen(port, function () {
  debug(`Listening on port ${port}!`)
})
