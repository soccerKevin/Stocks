export { getCandle } from './getCandle'

import * as alphaGetCandle from './alpha/getCandle'
import * as yahooGetCandle from './yahoo/getCandle'
import * as finnhubGetCandle from './finnhub/getCandle'

export const getCandles = {
  alpha:   alphaGetCandle,
  yahoo:   yahooGetCandle,
  finnhub: finnhubGetCandle,
}
