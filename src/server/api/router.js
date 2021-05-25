import Debug from 'debug'
import express from 'express'
import getCandle from './getCandle'

const debug = Debug('stocks:api')

var router = express.Router()

const handleError = (error, req, res, _next) => {
  debug('Error: ', error)
  res.status(500).json({ error: error.message })
}

router.get('/stock/:symbol/candle', getCandle)

router.use(handleError)

export default router
