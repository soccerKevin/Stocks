import Debug from 'debug'
import express from 'express'
import routes from './routes'

const debug = Debug('stocks:api:router')

var router = express.Router()

const handleError = (error, req, res, _next) => {
  debug('Error: ', error)
  res.status(500).json({ error: error.message })
}

router.get('/stock/:symbol/candle', routes.getCandle)
route.get('/stock/:symbol/stats', routes.getStats)

router.use(handleError)

export default router
