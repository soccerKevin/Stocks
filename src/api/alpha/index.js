var debug = require('debug')('stocks:api:alpha')
const axios = require('axios')
const path = require('path')
const { zipObject, values, entries } = require('lodash')

const { alpha: { apikey } } = require(path.resolve('config/index.js'))

const baseURL = 'https://www.alphavantage.co'
const route = '/query'
const DATA_POINT_KEYS = ['open', 'high', 'low', 'close', 'volume']

const getOptions = ({ endpoint, symbol, interval, outputsize }) => ({
  baseURL,
  method: 'get',
  params: {
    function: endpoint,
    symbol,
    interval,
    outputsize: outputsize || 68,
    apikey,
  }
})

const normalize = (data) => {
  const [ metaData, intervals ] = values(data)

  const normalizedData = entries(intervals).map((args) => {
    const [ timeStamp, pointsData ] = args;

    const output = zipObject(DATA_POINT_KEYS, values(pointsData))
    output.timeStamp = timeStamp

    return output
  })

  const sorted = normalizedData.sort((a, b) => new Date(a.timeStamp) - new Date(b.timeStamp))

  return sorted
}

/*
  options
  endpoint: required
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
