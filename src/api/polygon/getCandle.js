import { zipObject, values, entries } from 'lodash-es'
import moment from 'moment'
import config from 'stocks/config'

import { INTERVALS_HASH } from 'stocks/src/conf/intervals'
import { TICKERS_HASH } from 'stocks/src/conf/tickers'

const { polygon: { apiKey } } = config

const DATA_POINT_KEYS = ['open', 'high', 'low', 'close', 'volume']

const yesterday = () => moment(new Date()).subtract(1, 'days').format('YYYY-MM-DD')

export const getOptions = ({ symbol: symb, interval, outputsize, limit }) => {
  const { type, polygon } = TICKERS_HASH[symb]
  const symbol = type === 'crypto' ? polygon : symb

  return {
    baseURL: 'https://api.polygon.io',
    url:     `/v2/aggs/ticker/${symbol}/range/${INTERVALS_HASH[interval].polygon}/${yesterday()}/${yesterday()}`,
    params:  {
      limit: limit || 120,
      apiKey,
    },
  }
}

export const normalize = (data) => {
  const result = data.results.map(({ t, v, o, c, h, l }) => ({
    timestamp: t,
    volume:    v,
    open:      o,
    close:     c,
    high:      h,
    low:       l,
  }))

  return result
}
