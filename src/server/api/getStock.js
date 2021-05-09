const path = require('path')

const { getStock: getAlphaStock } = require(path.resolve('src/api/alpha/index.js'))
const { TIME_SERIES_INTRADAY } = require(path.resolve('src/api/alpha/endpoints.js'))

const symbol = 'GROW'
const interval = '5min'

const options = ({ symbol }) => ({
  endpoint: TIME_SERIES_INTRADAY,
  symbol,
  interval,
})

const getStock = async (req, res) => {
  // const { symbol } = req.params
  const data = await getAlphaStock(options(req.params))
  
  res.status(200).json(data)
}

module.exports = getStock