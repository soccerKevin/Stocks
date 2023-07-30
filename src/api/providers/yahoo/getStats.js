import moment from 'moment'
import config from 'stocks/config'
import { INTERVALS_HASH } from 'stocks/src/conf/intervals'
import { RANGES_HASH } from 'stocks/src/conf/ranges'
import { TICKERS_HASH } from 'stocks/src/conf/tickers'

const { yahoo: { apiKey, apiHost } } = config

export const getOptions = ({ symbol: symb }) => {
  const { type, yahoo } = TICKERS_HASH[symb]
  const symbol = type === 'crypto' ? yahoo : symb

  return {
    baseURL: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com',
    url:     '/stock/v3/get-statistics',
    params:  { symbol },
    headers: {
      'x-rapidapi-key':  apiKey,
      'x-rapidapi-host': apiHost,
    },
  }
}

export const normalize = (data) => {
  const {
    financialData: {
      currentPrice: {
        raw: currentPrice,
      },
    },
    price: {
      regularMarketChange: {
        raw: marketChange,
      },
      regularMarketChangePercent: {
        raw: percentChange,
      },
    },
    defaultKeyStatistics: {
      beta: {
        raw: beta,
      },
      pegRatio: {
        raw: pegRatio,
      },
    },
    summaryDetail: {
      marketCap: {
        raw: marketCap,
      }
    },
  } = data

  return {
    currentPrice,
    marketChange,
    percentChange,
    beta,
    pegRatio,
    marketCap,
  }
}