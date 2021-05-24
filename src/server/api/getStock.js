import Debug from 'debug'

import { getStock as getAlphaStock } from 'stocks/src/api/alpha/index'
// const { getStock: getYahooStock } = require(path.resolve('src/api/yahoo/index.js'))
import { TIME_SERIES_INTRADAY } from 'stocks/src/api/alpha/endpoints'

const debug = Debug('stocks:api')

export const options = ({ symbol, interval }) => ({
  endpoint: TIME_SERIES_INTRADAY,
  symbol,
  interval,
})

export const getStock = async ({ params, query }, res) => {
  debug('getStock', params, query)
  const data = await getAlphaStock(options({ ...params, ...query }))

  res.status(200).json(data)
}

export default getStock
