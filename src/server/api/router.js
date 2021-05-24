import express from 'express'
import getStock from './getStock'

var router = express.Router()

router.get('/stock/:symbol', getStock)

export default router
