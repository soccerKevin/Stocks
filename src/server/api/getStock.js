var debug = require('debug')('stocks:api')
const path = require('path')

const { getStock: getAlphaStock } = require(path.resolve('src/api/alpha/index.js'))
// const { getStock: getYahooStock } = require(path.resolve('src/api/yahoo/index.js'))
const { TIME_SERIES_INTRADAY } = require(path.resolve('src/api/alpha/endpoints.js'))

const options = ({ symbol, interval }) => ({
  endpoint: TIME_SERIES_INTRADAY,
  symbol,
  interval,
})

const getStock = async ({ params, query }, res) => {
  debug('getStock', params, query)
  const data = await getAlphaStock(options({ ...params, ...query }))

  res.status(200).json(data)
}

module.exports = getStock
