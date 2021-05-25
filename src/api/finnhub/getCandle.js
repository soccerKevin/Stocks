import moment from 'moment'
import config from 'stocks/config'
import { INTERVALS_HASH } from 'stocks/src/conf/intervals'
import { TICKERS_HASH } from 'stocks/src/conf/tickers'

const { finnhub: { apiKey } } = config

const getRoute = (symbol) => TICKERS_HASH[symbol].type == 'company' ? 'stock' : 'crypto'

export const getOptions = ({ symbol, interval, outputsize }) => ({
  baseURL: 'https://finnhub.io',
  url: `/api/v1/${getRoute(symbol)}/candle`,
  params: {
    symbol,
    resolution: INTERVALS_HASH[interval].finnhub,
    token: apiKey,
    from:  moment().startOf('day').unix(),
    to:    moment().unix(),
  },
})

export const status200Error = ({ data }) => {
  if (data.s === 'no_data') throw new Error('noData')
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
