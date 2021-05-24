import Debug from 'debug'
import express from 'express'
import getStock from './getStock'

const debug = Debug('stocks:api')

var router = express.Router()

const handleError = (error, req, res, next) => {
  debug('Error: ', error)
  res.status(500).json({ error: error.message })
}

router.get('/stock/:symbol', getStock)

router.use(handleError)

export default router
