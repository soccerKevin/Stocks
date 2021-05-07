const axios = require('axios')
const path = require('path');

const { alpha: { apiKey } } = require(path.resolve('config/index.js'))

const TIME_SERIES_INTRADAY = 'TIME_SERIES_INTRADAY'
const baseURL = 'https://www.alphavantage.co'

const reqOptions = ({ func, symbol, interval, apikey }) => ({
  baseURL,
  method: 'get',
  params: {
    function: func,
    symbol,
    interval,
    apikey,
  }
})

const options = reqOptions({
  func: TIME_SERIES_INTRADAY,
  symbol: 'GROW',
  interval: '5min',
  apikey: apiKey,
})

const route = '/query'

axios.get(route, options)
.then(response => {
  console.log(response.data)
})
.catch(error => {
  console.log(error)
});