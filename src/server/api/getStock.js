import Debug from 'debug'

import { getStock as apiGetStock } from 'stocks/src/api'

const debug = Debug('stocks:api')

export const getStock = async ({ params, query }, res, next) => {
  debug('getStock', params, query)
  try {
    const data = await apiGetStock('alpha', { ...params, ...query })
    res.status(200).json(data)
  } catch (error) {
    next(error)
  }
}

export default getStock
