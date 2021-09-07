import Debug from 'debug'

import { getStats as apiGetStats } from 'stocks/src/api'

const debug = Debug('stocks:api')

export const getStats = async ({ params, query }, res, next) => {
  debug('getStats', params, query)
  try {
    const data = await apiGetStats('yahoo', { ...params, ...query })
    res.status(200).json(data)
  } catch (error) {
    next(error)
  }
}

export default getStats
