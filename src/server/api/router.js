var express = require('express')
var router = express.Router()

const getStock = require('./getStock.js')

router.get('/stock/:symbol', getStock)

module.exports = router