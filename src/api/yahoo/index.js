var debug = require('debug')('stocks:api:yahoo')
var axios = require("axios").default;
const path = require('path')
const moment = require('moment')

const { yahoo: { apiKey, apiHost } } = require(path.resolve('config/index.js'))

const baseURL = 'https://apidojo-yahoo-finance-v1.p.rapidapi.com'
const route = '/stock/v2/get-chart'
const DATA_POINT_KEYS = ['open', 'high', 'low', 'close', 'volume', 'timestamp']

const getOptions = ({ endpoint, symbol, interval, outputsize }) => ({
  baseURL,
  params: {
    interval,
    symbol,
    range: '1d',
    region: 'US',
  },
  headers: {
    'x-rapidapi-key':  apiKey,
    'x-rapidapi-host': apiHost,
  }
})

const normalize = (data) => {
  const { meta, timestamp: timestamps, indicators } = data.chart.result[0]
  const { volume, open, close, high, low } = indicators.quote[0]
  const result = timestamps.reduce((acc, timestamp, i) => [
      ...acc,
      {
        timestamp: moment.unix(timestamp).format(),
        volume:    volume[i],
        open:      open[i],
        close:     close[i],
        high:      high[i],
        low:       low[i],
      },
    ],
    []
  )
  return result;
}

/*
  options
  symbol: required
  interval: required
*/
const getStock = (options) => {
  const routeOptions = getOptions(options)
  debug('Fetching: ', routeOptions)

  return axios.get(route, routeOptions)
  .then((response) => normalize(response.data))
  .catch((error) => {
    console.log(error)
  })
}

module.exports = { getStock }
