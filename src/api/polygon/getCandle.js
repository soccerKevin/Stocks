import { zipObject, values, entries } from 'lodash-es'
import moment from 'moment'
import config from 'stocks/config'

import { INTERVALS_HASH } from 'stocks/src/conf/intervals'

const { polygon: { apiKey } } = config

const DATA_POINT_KEYS = ['open', 'high', 'low', 'close', 'volume']

const today = () => moment(new Date()).format('YYYY-MM-DD')

export const getOptions = ({ symbol, interval, outputsize, limit }) => ({
  baseURL: 'https://api.polygon.io',
  url:     `/v2/aggs/ticker/${symbol}/range/${INTERVALS_HASH[interval].polygon}/${today()}/${today()}`,
  params:  {
    limit: limit || 120,
    apiKey,
  },
})

export const status200Errors = (response) => {
  console.log('******************** status200Errors: ', response)
  // if (response.data.Note) {
  //   const note = response.data.Note
  //   if (note.includes('API call frequency')) throw new Error('APILimitReached')
  // }
  // if (response.data['Error Message']) {
  //   const msg = response.data['Error Message']
  //   if (msg.includes('Invalid API call')) throw new Error('Invalid API call')
  // }
}

export const normalize = (data) => {
  console.log('data: ', data)
  const result = data.results.map(({ t, v, o, c, h, l }) => ({
    timestamp: t,
    volume:    v,
    open:      o,
    close:     c,
    high:      h,
    low:       l,
  }))

  console.log('result: ', result)
  return result
}
