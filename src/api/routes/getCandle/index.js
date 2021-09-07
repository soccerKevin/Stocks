export { getCandle } from './getCandle'

import * as alphaGetCandle from 'stocks/src/api/providers/alpha/getCandle'
import * as yahooGetCandle from 'stocks/src/api/providers/yahoo/getCandle'
import * as finnhubGetCandle from 'stocks/src/api/providers/finnhub/getCandle'

export const getCandlesFunction = {
  alpha:   alphaGetCandle,
  yahoo:   yahooGetCandle,
  finnhub: finnhubGetCandle,
}
