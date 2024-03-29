import moment from 'moment'
import config from 'stocks/config'
import { INTERVALS_HASH } from 'stocks/src/conf/intervals'
import { TICKERS_HASH } from 'stocks/src/conf/tickers'

const { yahoo: { apiKey, apiHost } } = config

export const getOptions = ({ symbol: symb, interval }) => {
  const { type, yahoo } = TICKERS_HASH[symb]
  const symbol = type === 'crypto' ? yahoo : symb

  return {
    baseURL: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com',
    url:     '/stock/v2/get-chart',
    params:  {
      interval: INTERVALS_HASH[interval].yahoo,
      symbol,
      range:    '1d',
      region:   'US',
    },
    headers: {
      'x-rapidapi-key':  apiKey,
      'x-rapidapi-host': apiHost,
    },
  }
}

export const normalize = (data) => {
  const { timestamp: timestamps, indicators } = data.chart.result[0]
  const { volume, open, close, high, low } = indicators.quote[0]
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
