import { zipObject, values, entries } from 'lodash-es'

import config from 'stocks/config'

import { INTERVALS_HASH } from 'stocks/src/conf/intervals'

const { alpha: { apikey } } = config
const TIME_SERIES_INTRADAY = 'TIME_SERIES_INTRADAY'
const DATA_POINT_KEYS = ['open', 'high', 'low', 'close', 'volume']

export const getOptions = ({ symbol, interval, outputsize }) => ({
  baseURL: 'https://www.alphavantage.co',
  url: '/query',
  params: {
    function: TIME_SERIES_INTRADAY,
    symbol,
    interval: INTERVALS_HASH[interval].alpha,
    outputsize: outputsize || 68,
    apikey,
  },
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

  const [ _metaData, intervals ] = values(data)

  const normalizedData = entries(intervals).map((args) => {
    const [ timeStamp, pointsData ] = args

    const output = zipObject(DATA_POINT_KEYS, values(pointsData))
    output.timestamp = timeStamp

    return output
  })

  const sorted = normalizedData.sort((a, b) => new Date(a.timeStamp) - new Date(b.timeStamp))

  return sorted
}
