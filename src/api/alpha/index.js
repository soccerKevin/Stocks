const axios = require('axios')
const path = require('path')

const { alpha: { apikey } } = require(path.resolve('config/index.js'))

const baseURL = 'https://www.alphavantage.co'
const route = '/query'

const getOptions = ({ endpoint, symbol, interval }) => ({
  baseURL,
  method: 'get',
  params: {
    function: endpoint,
    symbol,
    interval,
    apikey,
  }
})

const getStock = ({ endpoint, symbol, interval }) => {
  const options = getOptions({ endpoint, symbol, interval })
  
  return axios.get(route, options)
  .then((response) => response.data)
  .catch((error) => {
    console.log(error)
  })
}

module.exports = { getStock }