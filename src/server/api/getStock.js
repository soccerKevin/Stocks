const path = require('path')
const data = require('./fakeData')

const { getStock: getAlphaStock } = require(path.resolve('src/api/alpha/index.js'))
const { TIME_SERIES_INTRADAY } = require(path.resolve('src/api/alpha/endpoints.js'))

const symbol = 'GROW'
const interval = '5min'

const options = {
  endpoint: TIME_SERIES_INTRADAY,
  symbol,
  interval,
}

const getStock = async (req, res) => {
  const stockData = await getAlphaStock(options)
  console.log('stockData: ', stockData)
  res.status(200).json(data)
}

module.exports = getStock