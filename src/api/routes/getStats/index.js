export { getStats } from './getStats'

import * as yahooGetStats from 'stocks/src/api/providers/yahoo/getStats'

export const getStatsFunction = {
  yahoo: yahooGetStats,
}
