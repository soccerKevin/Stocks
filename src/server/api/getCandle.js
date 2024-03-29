import Debug from 'debug'

import { getCandle as apiGetCandle } from 'stocks/src/api'

const debug = Debug('stocks:api:getCandle')

export const getCandle = async ({ params, query }, res, next) => {
  debug('getCandle', params, query)
  try {
    const data = await apiGetCandle('polygon', { ...params, ...query })
    res.status(200).json(data)
  } catch (error) {
    next(error)
  }
}

export default getCandle
