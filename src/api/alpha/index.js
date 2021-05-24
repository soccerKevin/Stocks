import Debug from 'debug'
import axios from 'axios'
import path from 'path'
import { zipObject, values, entries } from 'lodash-es'

import config from 'stocks/config'

const debug = Debug('stocks:api:alpha')

const { alpha: { apikey } } = config

const baseURL = 'https://www.alphavantage.co'
const route = '/query'
const DATA_POINT_KEYS = ['open', 'high', 'low', 'close', 'volume']

export const getOptions = ({ endpoint, symbol, interval, outputsize }) => ({
  baseURL,
  params: {
    function: endpoint,
    symbol,
    interval,
    outputsize: outputsize || 68,
    apikey,
  }
})

export const status200Errors = (response) => {
  if (response.data.Note) {
    const note = response.data.Note
    if (note.includes('API call frequency')) throw new Error('APILimitReached')
  }
  if (response.data['Error Message']) {
    const msg = response.data['Error Message']
    if (msg.includes('Invalid API call')) throw new Error('Invalid API call')
  }
}

export const normalize = (data) => {

  const [ metaData, intervals ] = values(data)

  const normalizedData = entries(intervals).map((args) => {
    const [ timeStamp, pointsData ] = args;

    const output = zipObject(DATA_POINT_KEYS, values(pointsData))
    output.timestamp = timeStamp

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
export const getStock = (options) => {
  const routeOptions = getOptions(options)
  debug('Fetching: ', routeOptions)
  return axios.get(route, routeOptions)
  .then((response) => {
    status200Errors(response)
    return response
  })
  .then((response) => normalize(response.data))
}
