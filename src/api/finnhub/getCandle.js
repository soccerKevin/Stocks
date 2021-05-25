import moment from 'moment'
import config from 'stocks/config'
import { INTERVALS_HASH } from 'stocks/src/conf/intervals'
import { TICKERS_HASH } from 'stocks/src/conf/tickers'

const { finnhub: { apiKey } } = config

export const getOptions = ({ symbol: symb, interval }) => {
  console.log('TICKERS_HASH[symb]: ', TICKERS_HASH[symb])
  const { type, binanceSymbol } = TICKERS_HASH[symb]

  const route = type == 'crypto' ? 'crypto' : 'stock'
  const symbol = type === 'crypto' ? `BINANCE:${binanceSymbol}` : symb

  return {
    baseURL: 'https://finnhub.io',
    url: `/api/v1/${route}/candle`,
    params: {
      symbol,
      resolution: INTERVALS_HASH[interval].finnhub,
      token: apiKey,
      from:  moment().startOf('day').unix(),
      to:    moment().unix(),
    },
  }
}

export const status200Errors = ({ data: { s } }) => {
  if (s == 'no_data') throw new Error('noData')
}

export const normalize = (data) => {
  const { c: close, h: high, l: low, o: open, t: timestamps, v: volume } = data
  const result = timestamps.reduce((acc, timestamp, i) => (
    [
      ...acc,
      {
        timestamp: moment.unix(timestamp).format(),
        volume:    volume[i],
        open:      open[i],
        close:     close[i],
        high:      high[i],
        low:       low[i],
      },
    ]),
  []
  )
  return result
}
