export { getCandle } from './getCandle'

import * as alphaGetCandle from './alpha/getCandle'
import * as yahooGetCandle from './yahoo/getCandle'

export const getCandles = { alpha: alphaGetCandle, yahoo: yahooGetCandle }
